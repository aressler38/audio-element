audio-element
=============

This project defines an html5 audio element with customized controls.
Currently, the control is simply a play/pause toggle.



Example usage:
   
    var audioElement = AudioElement({
        source: "test/47",
        fileTypes: ["ogg", "mp3"],
        buttonRadius: 16  
    });
    document.body.appendChild( audioElement.render() );

Where, 
    * source is a string that defines the path to the audio file. Don't include a file extension.
    * fileTypes is a list of file exensions that will be appended to the source. If you have .ogg and .mp3
      files in the same directory and excluding the file extension, their names are identical, then you
      can just put the name of the file in the source and the types of files to be downloaded in fileTypes.
      The program will reconstruct the correct file path and download the audio files.
      Special Case: "all" is a synonym for ["ogg", "mp3", "wav"]
    * buttonRadius defines the size of the button. Twice this value is equal to the width of the div. 
      Since the play button is a circle, I think it's easier to specify a radial measure.



TODOs:
    * Abstract CSS controls 
    * Add ability to strip a file extension that is input for source param. 
   
