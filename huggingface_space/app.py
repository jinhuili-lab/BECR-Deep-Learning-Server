import gradio as gr
import numpy as np
from tensorflow.keras.models import load_model

# Replace with your trained Keras model file
model = load_model("model.keras")

AMINO_ACIDS = "ACDEFGHIKLMNPQRSTVWY"

def encode_sequence(seq):
    seq = seq.upper().strip()
    vector = np.zeros((1, 100, len(AMINO_ACIDS)))

    for i, aa in enumerate(seq[:100]):
        if aa in AMINO_ACIDS:
            vector[0, i, AMINO_ACIDS.index(aa)] = 1

    return vector

def predict(sequence):
    x = encode_sequence(sequence)
    pred = float(model.predict(x)[0][0])
    return {
        "BECR probability": round(pred, 4),
        "Prediction": "Positive" if pred >= 0.5 else "Negative"
    }

demo = gr.Interface(
    fn=predict,
    inputs=gr.Textbox(lines=6, label="Protein Sequence"),
    outputs=gr.JSON(label="Prediction"),
    title="BECR Sequence Predictor",
    description="Distilled sequence-only model for protein prediction."
)

demo.launch()
