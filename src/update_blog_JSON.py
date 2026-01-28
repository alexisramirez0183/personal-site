import os
import json
from bs4 import BeautifulSoup

filepath = './blog_posts/'

filenames = os.listdir(filepath)

print(f"names in Images Folder", filenames) 

json_file = "./blog_posts.json"

with open (json_file,'w') as file:
    json.dump(filenames, file, indent=4)



