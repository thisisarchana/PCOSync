import { z } from 'zod'

const AnalysisSchema = z.object({
  parameters: z.array(
    z.object({
      parameter: z.string().describe('The medical parameter name'),
      value: z.string().describe('The measured value with unit'),
      status: z.enum(['normal', 'attention', 'elevated']).describe('Health status of this parameter'),
      explanation: z.string().describe('Plain language explanation for a patient'),
    })
  ),
  reportType: z.string().describe('Type of medical report analyzed'),
  summary: z.string().describe('Brief overall summary'),
  feedback: z.object({
    overallAssessment: z.string().describe('Overall assessment of the report'),
    keyFindings: z.array(z.string()).describe('Key findings from the report'),
    recommendations: z.array(z.string()).describe('Actionable recommendations for the patient'),
    whenToSeeDoctors: z.array(z.string()).describe('Situations when patient should see their doctor'),
  }).describe('Comprehensive feedback and recommendations'),
})

type AnalysisInput = {
  base64Data: string
  fileType: 'pdf' | 'image'
}

// Educational mock analysis function that simulates medical report analysis
function generateMockAnalysis(fileType: string): z.infer<typeof AnalysisSchema> {
  const analyses = [
    {
      reportType: 'Hormonal Panel',
      parameters: [
        {
          parameter: 'LH/FSH Ratio',
          value: '2.8',
          status: 'elevated' as const,
          explanation: 'Your LH to FSH ratio is slightly higher than typical. In PCOS, this ratio is often above 2:1. This doesn\'t mean anything is wrong, but it\'s something your doctor might want to monitor.',
        },
        {
          parameter: 'Testosterone',
          value: '52 ng/dL',
          status: 'attention' as const,
          explanation: 'Your testosterone level is at the upper end of normal. Slightly elevated androgens are common in PCOS and can contribute to symptoms like acne or hair changes.',
        },
        {
          parameter: 'Prolactin',
          value: '15 ng/mL',
          status: 'normal' as const,
          explanation: 'Your prolactin level is within the healthy range, which is good. This hormone doesn\'t appear to be contributing to your symptoms.',
        },
        {
          parameter: 'DHEA-S',
          value: '180 µg/dL',
          status: 'attention' as const,
          explanation: 'Your DHEA-S is slightly elevated, which can occur in PCOS. Managing stress and sleep can help optimize this hormone.',
        },
        {
          parameter: 'AMH',
          value: '6.2 ng/mL',
          status: 'elevated' as const,
          explanation: 'AMH (Anti-Mullerian Hormone) is higher than average. In PCOS, this can indicate more follicles in the ovaries, which is one of the diagnostic criteria.',
        },
      ],
      summary: 'Your hormonal panel shows patterns consistent with PCOS, including elevated androgens and AMH levels. These findings support the importance of lifestyle management and regular monitoring with your healthcare provider.',
      feedback: {
        overallAssessment: 'Your hormonal profile is consistent with PCOS diagnosis. While some values show elevated androgens and AMH, your prolactin is normal, which is positive. These results support the need for lifestyle management but are not alarming.',
        keyFindings: [
          'Elevated LH/FSH ratio (2.8) - common in PCOS, indicates imbalance in reproductive hormones',
          'Slightly elevated testosterone - can explain symptoms like acne, excess hair growth, or irregular periods',
          'Normal prolactin - rules out hyperprolactinemia as a cause of your symptoms',
          'Elevated AMH - indicates normal ovarian reserve despite PCOS diagnosis',
        ],
        recommendations: [
          'Focus on regular exercise (150+ minutes/week) - helps improve insulin sensitivity and hormone balance',
          'Adopt an anti-inflammatory diet rich in whole grains, fruits, and vegetables',
          'Maintain healthy weight through balanced nutrition - even 5-10% weight loss can improve symptoms',
          'Manage stress through yoga, meditation, or other relaxation techniques',
          'Get 7-9 hours of quality sleep - poor sleep worsens hormonal imbalance',
          'Consider working with a registered dietitian experienced in PCOS management',
        ],
        whenToSeeDoctors: [
          'If your symptoms worsen or new symptoms develop',
          'Before starting any new medications or supplements',
          'If planning for pregnancy - discuss preconception counseling',
          'For annual follow-up to monitor hormone levels and adjust treatment if needed',
        ],
      },
    },
    {
      reportType: 'Metabolic Panel',
      parameters: [
        {
          parameter: 'Fasting Glucose',
          value: '95 mg/dL',
          status: 'normal' as const,
          explanation: 'Great news! Your fasting glucose is within the healthy range. Maintaining stable blood sugar through diet and exercise helps manage PCOS symptoms.',
        },
        {
          parameter: 'Insulin',
          value: '12 mIU/L',
          status: 'normal' as const,
          explanation: 'Your insulin levels look good! This suggests your body is handling insulin well, which is positive for PCOS management.',
        },
        {
          parameter: 'HOMA-IR',
          value: '2.8',
          status: 'attention' as const,
          explanation: 'Your HOMA-IR suggests mild insulin resistance. This is common in PCOS but can be improved with exercise and dietary changes.',
        },
        {
          parameter: 'Total Cholesterol',
          value: '210 mg/dL',
          status: 'attention' as const,
          explanation: 'Your cholesterol is slightly elevated. Focus on heart-healthy fats and regular exercise to help improve this number.',
        },
        {
          parameter: 'HDL Cholesterol',
          value: '45 mg/dL',
          status: 'attention' as const,
          explanation: 'Your "good" cholesterol is lower than ideal. Aerobic exercise is one of the best ways to naturally increase HDL levels.',
        },
      ],
      summary: 'Your metabolic panel shows relatively good glucose control, but some attention to cholesterol and insulin resistance through lifestyle modifications would be beneficial.',
      feedback: {
        overallAssessment: 'Your metabolic profile shows good glucose control but mild insulin resistance and slightly elevated cholesterol. These are manageable through lifestyle changes and don\'t require immediate medication in most cases.',
        keyFindings: [
          'Fasting glucose is normal - good glucose control at baseline',
          'HOMA-IR of 2.8 indicates mild insulin resistance - common in PCOS but improvable',
          'Total cholesterol slightly elevated - increases cardiovascular risk if not addressed',
          'Low HDL cholesterol - major risk factor for heart disease, especially in PCOS',
        ],
        recommendations: [
          'Increase aerobic exercise to 30 minutes most days - this directly improves insulin sensitivity and raises HDL',
          'Reduce refined carbohydrates and added sugars - choose whole grains instead',
          'Increase soluble fiber intake (oats, beans, fruit) - helps lower cholesterol and stabilize blood sugar',
          'Include lean protein and healthy fats at each meal - slows glucose absorption',
          'Consider inositol supplementation - research shows benefit for insulin resistance in PCOS',
          'Monitor weight - excess body weight worsens insulin resistance',
          'Limit processed foods and increase heart-healthy foods like fish, nuts, and olive oil',
        ],
        whenToSeeDoctors: [
          'If fasting glucose rises above 100 mg/dL or if you develop prediabetes symptoms',
          'If cholesterol continues to rise despite lifestyle changes - may need medication',
          'For annual metabolic screening to track progress',
          'If you experience fatigue, increased thirst, or frequent urination - signs of worsening glucose control',
        ],
      },
    },
    {
      reportType: 'Thyroid Function',
      parameters: [
        {
          parameter: 'TSH',
          value: '2.1 mIU/L',
          status: 'normal' as const,
          explanation: 'Your TSH is in the optimal range. Your thyroid appears to be functioning well, which is important for metabolism and overall health.',
        },
        {
          parameter: 'Free T4',
          value: '1.2 ng/dL',
          status: 'normal' as const,
          explanation: 'Your thyroid hormone level is healthy. This helps regulate your metabolism and energy levels.',
        },
        {
          parameter: 'Free T3',
          value: '3.1 pg/mL',
          status: 'normal' as const,
          explanation: 'Your Free T3 is within normal range, indicating good thyroid hormone availability to your tissues.',
        },
        {
          parameter: 'TPO Antibodies',
          value: '8 IU/mL',
          status: 'normal' as const,
          explanation: 'Your thyroid antibodies are negative, which means you don\'t have autoimmune thyroid disease. Good news for long-term thyroid health.',
        },
      ],
      summary: 'Your thyroid function is normal across all markers. This is positive news and suggests your thyroid is not contributing to PCOS symptoms.',
      feedback: {
        overallAssessment: 'Excellent news! Your thyroid is functioning optimally across all markers. This rules out thyroid disorders as a contributor to your symptoms and supports overall metabolic health.',
        keyFindings: [
          'All thyroid markers are within optimal ranges',
          'No autoimmune thyroid disease detected - TPO antibodies are negative',
          'TSH is in the ideal range (1.5-2.5) for metabolism and symptom management',
          'Adequate thyroid hormone production and conversion (T4 to T3)',
        ],
        recommendations: [
          'Continue with good lifestyle habits that support thyroid health',
          'Maintain adequate iodine, selenium, and zinc intake through diet or supplementation',
          'Manage stress - chronic stress can affect thyroid function',
          'Get regular exercise - supports thyroid health and weight management',
          'Ensure adequate sleep - critical for thyroid hormone regulation',
          'Limit goitrogenic foods in excess (raw cruciferous vegetables, soy)',
          'Stay hydrated - essential for all bodily functions including thyroid',
        ],
        whenToSeeDoctors: [
          'If you develop symptoms of hypothyroidism (fatigue, weight gain, cold sensitivity)',
          'If you develop symptoms of hyperthyroidism (anxiety, weight loss, heat sensitivity)',
          'For routine screening - once every 1-2 years is reasonable for PCOS management',
          'If starting new medications - some can interact with thyroid function',
        ],
      },
    },
  ]

  return analyses[Math.floor(Math.random() * analyses.length)]
}

export async function POST(req: Request) {
  try {
    const { base64Data, fileType }: AnalysisInput = await req.json()

    if (!base64Data) {
      return Response.json(
        { error: 'No file data provided' },
        { status: 400 }
      )
    }

    // Generate mock analysis (educational/demo purposes)
    // In a production environment with an AI API, actual image analysis would occur here
    const result = generateMockAnalysis(fileType)

    return Response.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return Response.json(
      { error: 'Failed to analyze report' },
      { status: 500 }
    )
  }
}
