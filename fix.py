import sys
import re

with open('c:\\Users\\User\\Downloads\\Second Chance To Life\\app.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Replace priceTiers
def repl_precio(m):
    idx = m.start()
    if 'Hope' in text[max(0, idx-300):idx]:
        return 'priceTier: "₹₹₹"'
    if 'Dawn' in text[max(0, idx-300):idx]:
        return 'priceTier: "₹"'
    if 'Serenity' in text[max(0, idx-300):idx]:
        return 'priceTier: "₹₹"'
    return m.group(0)

text = re.sub(r'priceTier:\s*".*?"', repl_precio, text)

# Replace garbled language checks in booking section (line ~751)
# Looking for transcript.includes statements with garbled text.
# The garbled text was replacing hindi words. We'll replace the second half of the if condition.
pattern = r"transcript\.includes\('yes'\) \|\| transcript\.includes\('yeah'\) \|\| transcript\.includes\('book'\) \|\| transcript\.includes\('sure'\) \|\|[\s\S]*?\{"
replacement = "transcript.includes('yes') || transcript.includes('yeah') || transcript.includes('book') || transcript.includes('sure') || \\\n                    transcript.includes('हां') || transcript.includes('हाँ') || transcript.includes('जरूर') || transcript.includes('बुक')) {"

text = re.sub(pattern, replacement, text)

with open('c:\\Users\\User\\Downloads\\Second Chance To Life\\app.js', 'w', encoding='utf-8') as f:
    f.write(text)
