#!/bin/bash
FILE="src/index.tsx"

# Add import
grep -q "LegalAdvice" $FILE || sed -i '1i import LegalAdvice from "./components/LegalAdvice";' $FILE

# Insert a tab button (if not exists)
grep -q "legal-advice-button" $FILE || sed -i '/Run Forensic Analysis/i \
      <button id="legal-advice-button" onClick={() => setPage("legal")}>Legal Advice<\/button>' $FILE

# Insert page switcher container (safe append)
grep -q "page === \"legal\"" $FILE || sed -i '/return (/a \
    {page === "legal" && <LegalAdvice />} ' $FILE
