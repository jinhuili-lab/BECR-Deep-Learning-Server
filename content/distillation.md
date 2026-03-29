# Distillation Results

The sequence-only student model achieved nearly identical performance to the teacher fusion model while dramatically reducing inference cost.

| Model | Parameters | AUC |
|------|------|------|
| Teacher fusion model | 42 M | 0.972 |
| Distilled student model | 8 M | 0.964 |

## Advantages

- Requires only a raw amino acid sequence
- No external PSSM generation step
- Faster deployment in web servers and Hugging Face Spaces
