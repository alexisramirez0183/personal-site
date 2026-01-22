import os
import json

filepath = './Images/'

filenames = os.listdir(filepath)

print(f"names in Images Folder", filenames) 

json_file = "./portfolio_images.json"

with open (json_file,'w') as file:
    json.dump(filenames, file, indent=4)



