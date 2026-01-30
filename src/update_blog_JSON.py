import os
import json
from bs4 import BeautifulSoup

filepath = './blog_posts/'

filenames = os.listdir(filepath)
print(f"names in Blog Folder", filenames)

final_json = []

for file in filenames:
    # Soup Setup
    file_path_for_soup = filepath + file
    file_path_for_html = "blog_posts/" + file
    filehandle = open(file_path_for_soup)
    soup = BeautifulSoup(filehandle, features="html.parser")

    # Gathering Post Info
    post_title = soup.title.string
    post_date = soup.time['datetime']
    post_description = soup.find_all("meta")[1]["content"]

    #Printing out data gathered for each file
    print(f"this is the post title for",file,":", post_title)
    print(f"this is the date for",file,":", post_date)
    print(f"this is the description for",file,":", post_description)

    #Appending to post_info array
    single_post_json = {
            "post_title": post_title,
            "file_path": file_path_for_html,
            "post_date": post_date,
            "post_description": post_description
    }

    final_json.append(single_post_json)


print (f"post info array:", final_json)

json_file = "./blog_posts.json"

with open (json_file,'w') as file:
    json.dump(final_json, file, indent=4)





