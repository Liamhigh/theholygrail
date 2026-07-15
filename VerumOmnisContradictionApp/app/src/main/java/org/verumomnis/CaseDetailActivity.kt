package org.verumomnis

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.verumomnis.databinding.ActivityCaseDetailBinding
import org.verumomnis.engine.EngineManager
import org.verumomnis.utils.FileUtils
import org.verumomnis.utils.OcrUtils

class CaseDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCaseDetailBinding
    private val allEvidence = StringBuilder()
    private var caseId: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCaseDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        caseId = intent.getStringExtra("caseId") ?: ""

        binding.btnAddText.setOnClickListener {
            val text = binding.editTextNote.text.toString()
            if (text.isNotEmpty()) {
                allEvidence.append(text).append("\n")
                binding.editTextNote.text.clear()
            }
        }

        binding.btnAddImage.setOnClickListener {
            OcrUtils.pickImage(this) { extractedText ->
                allEvidence.append(extractedText).append("\n")
            }
        }

        binding.btnGenerateReport.setOnClickListener {
            lifecycleScope.launch {
                // Run the full 4-layer forensic engine pipeline
                val report = withContext(Dispatchers.Default) {
                    val engineManager = EngineManager()
                    engineManager.analyze(allEvidence.toString())
                }

                // Save the final report
                FileUtils.saveReport(this@CaseDetailActivity, caseId, report)

                // Navigate to report viewer
                val intent = Intent(this@CaseDetailActivity, ReportViewerActivity::class.java)
                intent.putExtra("caseId", caseId)
                startActivity(intent)
            }
        }
    }
}
