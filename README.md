# Pen Label Generator

## Overview 

The Pen Label Generator is an internal software tool for generating labels for pens. It's designed to automate the process, eliminating the need to create labels manually. The software reads a folder containing the pens and allows users to add pens and customize their labels. Once all the pens are entered, the software generates a PDF file containing the labels to be printed on label paper.

## Features

The Pen Label Generator has several features that make it an ideal tool for generating labels for pens. Some of these features include:

- Font size adjustment for each pen label
- The ability to add and remove pens from the cart
- The ability to edit the name of each pen label
- The option to choose which images to display for each pen


## Requirements

To use the Pen Label Generator, you need to meet the following requirements:

- **Ghostscript:** Download and install Ghostscript from [https://ghostscript.com/releases/gsdnld.html](https://ghostscript.com/releases/gsdnld.html) and make sure it's in the path.
- **GraphicsMagick:** Download and install GraphicsMagick from [https://sourceforge.net/projects/graphicsmagick/files/](https://sourceforge.net/projects/graphicsmagick/files/) and make sure it's in the path under the command name ```gm```.

## Installation

To install the Pen Label Generator:

1. Clone the repository.
2. Type `npm install`.
3. To run the program in development mode, type `npm run tauri dev`.

## Usage

To use the Pen Label Generator:

1. Open the program and navigate to the folder containing the pens that need labels. ```pens-example``` folder is provided in the repository
2. Use the search bar to add any pen that is located in the directory.
3. Define each pen with its name and choose the proper image for the pen (usually 1-3 images).
4. Add the pens to the cart and go to the cart.
5. Customize the font size of any desired pen and change its name as needed.
6. Click "Save as PDF" to generate the PDF file containing the labels.
7. Print the PDF file on the label paper and cut the labels as desired.