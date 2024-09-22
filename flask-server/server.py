import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pm4py

app = Flask(__name__)

# Configure the folder where the uploaded files will be stored temporarily
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pnml'}

# Function to check if the uploaded file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for handling the POST request with the .pnml file
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        # Save the file temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            # Read the .pnml file with pm4py
            net, initial_marking, final_marking = pm4py.read_pnml(filepath)

            # Do some processing with the parsed Petri net (net, initial_marking, final_marking)
            # For example, return a simple statistic like the number of places, transitions, or arcs
            places = len(net.places)
            transitions = len(net.transitions)
            arcs = len(net.arcs)

            # Remove the file after processing if no longer needed
            os.remove(filepath)

            # Return the results as JSON
            return jsonify({
                "places": places,
                "transitions": transitions,
                "arcs": arcs
            }), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    else:
        return jsonify({"error": "Invalid file type, only .pnml allowed"}), 400


if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    app.run(debug=True)
