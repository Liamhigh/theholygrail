#!/bin/bash
FILE="src/index.tsx"

# Import LicensingNotice at top
grep -q "LicensingNotice" $FILE || sed -i '1i import LicensingNotice from "./components/LicensingNotice";' $FILE

# Insert userType state if missing
grep -q "const \[userType" $FILE || \
sed -i '/function App()/a const [userType, setUserType] = useState(null);\nconst [acceptedLicense, setAcceptedLicense] = useState(false);' $FILE

# Patch initial user landing to include licensing check
grep -q "setUserType(\"institution\")" $FILE || \
sed -i '/Private Person/i \
      <button onClick={() => { setUserType("institution"); }} style={styles.button}>Institution<\/button>' $FILE

grep -q "setUserType(\"company\")" $FILE || \
sed -i '/setUserType("institution")/a \
      <button onClick={() => { setUserType("company"); }} style={styles.button}>Company<\/button>' $FILE

# Insert license notice screen
grep -q "LicensingNotice" $FILE || \
sed -i '/return (/a \
    {userType !== null && !acceptedLicense && (userType === "institution" || userType === "company") && (\
      <LicensingNotice onAcknowledge={() => setAcceptedLicense(true)} />\
    )}' $FILE
