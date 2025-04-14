# convert_songs_to_json.py
import json5
import json

input_file = "songs_raw_array.js"
output_file = "songs.json"

with open(input_file, "r", encoding="utf-8") as f:
    raw = f.read()

start = raw.find("[")
end = raw.rfind("]") + 1
array_str = raw[start:end]

parsed_data = json5.loads(array_str)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(parsed_data, f, ensure_ascii=False, indent=2)

print(f"Output file：{output_file}")
