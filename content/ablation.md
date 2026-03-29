# Ablation Results

Removing any modality reduced overall performance, indicating that each branch contributes complementary information.

| Removed Component | ΔAUC |
|------|------|
| PSSM branch | -0.011 |
| CMT branch | -0.017 |
| Sequence branch | -0.028 |

The sequence branch contributed the largest performance decrease when removed, whereas the PSSM branch produced a smaller but reproducible gain.
