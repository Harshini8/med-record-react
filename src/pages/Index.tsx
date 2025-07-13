import { PatientDashboard } from '@/components/PatientDashboard';

const Index = () => {
  // Sample patient data from the API response
  const mockPatientData = {
    medical_history: [
      '{"encounter_date":"2025-05-20","diagnosis":"Hypertension","summary":"Adult male patient Rajesh Iyer, presented for clinical investigation primarily focused on blood pressure management, with recorded systolic and diastolic pressures of 130/85 mmHg, indicative of elevated levels."}'
    ],
    recent_patient_record: {
      resourceType: 'Bundle',
      type: 'collection',
      id: 'bundle-P003-20250822',
      date: '2025-08-22',
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: 'a11f02e3-9cb3-42aa-b50f-3b3e4dbe91a2',
            identifier: [{ system: 'https://hackathon.local/mrn', value: 'P003' }],
            name: [{ family: 'Iyer', given: ['Rajesh'] }],
            gender: 'male',
            birthDate: '1982-03-12',
            telecom: [{ system: 'phone', value: '+91-98888-77777', use: 'mobile' }],
            address: [{ line: ['Chennai, Tamil Nadu'], country: 'IN' }]
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'obs-BP-2025-08-22',
            status: 'final',
            category: [{ coding: [{ code: 'vital-signs' }] }],
            code: { coding: [{ display: 'Blood pressure' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T08:30:00Z',
            component: [
              { code: { display: 'Systolic' }, valueQuantity: { value: 138, unit: 'mmHg' } },
              { code: { display: 'Diastolic' }, valueQuantity: { value: 88, unit: 'mmHg' } }
            ]
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'obs-HbA1c-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'Hemoglobin A1c' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:00:00Z',
            valueQuantity: { 
              value: 6.7, 
              unit: '%', 
              referenceRange: [{ low: { value: 4 }, high: { value: 5.6 } }] 
            }
          }
        },
        {
          resource: {
            resourceType: 'DiagnosticReport',
            id: 'lab-2025-08-22-lipid',
            status: 'final',
            category: [{ coding: [{ code: 'LAB' }] }],
            code: { coding: [{ display: 'Lipid Profile' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            result: [
              { reference: 'Observation/tc-2025-08-22' },
              { reference: 'Observation/hdl-2025-08-22' },
              { reference: 'Observation/ldl-2025-08-22' },
              { reference: 'Observation/tg-2025-08-22' },
              { reference: 'Observation/ratio-chol-2025-08-22' }
            ],
            presentedForm: [{
              contentType: 'application/pdf',
              url: 'https://healthhackblob.blob.core.windows.net/diagnostic-reports/a11f02e3-9cb3-42aa-b50f-3b3e4dbe91a2/2025-08-22/lipid.pdf',
              title: 'Lipid Profile Report'
            }],
            conclusion: 'Elevated LDL and borderline triglycerides. Low HDL. Recommend statins and diet control.'
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'Observation/tc-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'Total Cholesterol' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            valueQuantity: { 
              value: 238, 
              unit: 'mg/dL', 
              referenceRange: [{ low: { value: 0 }, high: { value: 200 } }] 
            }
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'Observation/hdl-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'HDL Cholesterol' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            valueQuantity: { 
              value: 39, 
              unit: 'mg/dL', 
              referenceRange: [{ low: { value: 40 }, high: { value: 100 } }] 
            }
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'Observation/ldl-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'LDL Cholesterol' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            valueQuantity: { 
              value: 160, 
              unit: 'mg/dL', 
              referenceRange: [{ low: { value: 0 }, high: { value: 130 } }] 
            }
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'Observation/tg-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'Triglycerides' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            valueQuantity: { 
              value: 190, 
              unit: 'mg/dL', 
              referenceRange: [{ low: { value: 0 }, high: { value: 150 } }] 
            }
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            id: 'Observation/ratio-chol-2025-08-22',
            status: 'final',
            code: { coding: [{ display: 'Total/HDL Ratio' }] },
            subject: { reference: 'Patient/P003' },
            effectiveDateTime: '2025-08-22T09:30:00Z',
            valueQuantity: { 
              value: 6.1, 
              referenceRange: [{ low: { value: 0 }, high: { value: 5 } }] 
            }
          }
        }
      ]
    },
    diagnostic_reports: {
      reports: [{
        report_type: 'Pathology',
        report_source: 'https://healthhackblob.blob.core.windows.net/diagnostic-reports/a11f02e3-9cb3-42aa-b50f-3b3e4dbe91a2/2025-08-22/lipid.pdf'
      }]
    },
    treatment_options: [
      'Atorvastatin 80 mg/day as first-line therapy per NICE guidelines for LDL management; aim for an LDL target of <1.4 mmol/L.',
      'Lifestyle measures including diet rich in fruits and vegetables, exercise of 150 minutes per week, and salt reduction to control mild hypertension.'
    ],
    score: 8,
    rationale: 'Based on the retrieved evidence from NHS guidelines, high-intensity statins like Atorvastatin (80 mg/day) are recommended for effectively lowering LDL levels in patients like Rajesh Iyer, who has elevated LDL and total cholesterol. Moreover, lifestyle changes are emphasized for controlling mild hypertension and improving overall cardiovascular health.'
  };

  return <PatientDashboard mockData={mockPatientData} />;
};

export default Index;
