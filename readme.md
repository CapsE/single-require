#### Concept
Include single files from web recourses like github.com. Makes it easy to reuse your code without the need to create special packages.

#### Installation
``` 
npm install -g single-require
```

#### Usage
* Create a file with the name of the file you want to include.
* Add the .req file extension to it.
* Write the url of the file you want to include into your file.
* run the "req" command in your console.

##### Example
![A folder showing how to setup the file](https://github.com/CapsE/single-require/blob/master/example/example.png?raw=true "Example")

Keep in mind the "req" command will check the current folder with all it's subfolders for files with the ".req" file extension. This tool also doesn't check versions but instead just downloads the given files.

#### Private Repositories
Currently only public sources and private GitLab repositories can be accessed. To access files from you GitLab account add your private GitLab API Token to the config.json located at "%APPDATA%/single-require/"