# Video to VTT conversion

For getting caption file for video, the following steps need to be followed:

- Convert video to audio (.wav is the fastest) - For this we can used the FFMPEG library.
For Node - [npm: fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg)
For Dotnet - [Retyped.fluent-ffmpeg 2.1.6733](https://www.nuget.org/packages/Retyped.fluent-ffmpeg)

- Convert audio(.wav) to srt using vosk [alphacep/vosk-api](https://github.com/alphacep/vosk-api/)
Vosk requires a language model for conversion.
All available models are listed here [VOSK Models](https://alphacephei.com/vosk/models).
The most accurate model for english is of 1GB
Demo for Node - <https://github.com/alphacep/vosk-api/tree/master/nodejs>

- Convert .SRT to .VTT for web use - We can use FFMPEG for this as well

But this entire process cannot be completed in client-side as it would require access to file-system.
For this POC, I have been using NodeJS.
Both Vosk and FFMPEG have are available in Dotner(C#) as well.

> **Note:**
Vosk requires FFI-NAPI and node-gyp support. And also Python 2.7

>If you haven't got python installed along with all the node-gyp dependencies, simply open Powershell or Git Bash with administrator privileges and execute:
    ```
    npm install --global --production windows-build-tools
    ```
> and then to install the package:
    ```
    npm install --global node-gyp
    ```
> once installed, you will have all the node-gyp dependencies downloaded, but you still need the environment variable. Validate Python is indeed found in the correct folder:

> C:\Users\ben\.windows-build-tools\python27\python.exe
It uses python 2.7 not 3.x as it is not supported*
