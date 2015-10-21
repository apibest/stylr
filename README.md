# Stylr
### Node Sass builder

#### Installation
1. To install _Stylr_ just clone our repository in your project via ``git clone git@github.com:apibest/stylr.git``
2. After cloning repository open its directory and install all dependencies via ``npm install``. If the error will
has been occured retry last command with rights of superuser.
3. Done! module is ready to build your Sass files

#### Configuration
Configuration file is presented as JSON-file _.stylrrc_ that should be created in the root directory of _Stylr_ module.
Configuration file should contain the following properties:

* ``sources`` - __Array__ representing the list of sources from which Sass would be merged in temporary folder;
* ``destination`` - __String__ path to destination file (where compiled styles should be stored);
* ``inputFile`` - __String__ path to the main Sass file (where all imports begin);
* ``temp`` - __String__ title of the temporary folder will be created;
* ``outputStyle`` - __String__ defining output style of the compiled Sass files (_compressed_ to minify);
* ``sourceMap`` - __String__ path to sourcemap file.

#### Running
To make _Stylr_ build styles run the following command: `node index.js` in the _Stylr_ folder

#### Example
The following config file describes project containing Sass sources consisting from two modules `module1` and `module2`
that should be compiled, minified and stored in the file `main.css` with appropriate sourcemaps in `assets/css` folder.
Temporary folder in which will be merged all styles has the name `.tmp`

<pre>
{
  "sources": [
        "../module1/src/styles",
        "../module2/src/styles"
      ],
  "destination": "../assets/css/main.css",
  "inputFile": "main.scss",
  "temp": ".tmp",
  "outputStyle": "compressed",
  "sourceMap": "../assets/css/maps/main.map"
}
</pre>

