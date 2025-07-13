import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  FileText, 
  Download,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Heart,
  Droplets
} from 'lucide-react';
import { PatientInfo } from './PatientInfo';
import { MedicalHistory } from './MedicalHistory';
import { LabResults } from './LabResults';
import { DiagnosticReports } from './DiagnosticReports';
import { TreatmentRecommendations } from './TreatmentRecommendations';

interface PatientData {
  medical_history: string[];
  recent_patient_record: any;
  diagnostic_reports: any;
  treatment_options?: string[];
  score?: number;
  rationale?: string;
}

interface PatientDashboardProps {
  patientId?: string;
  mockData?: PatientData;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ 
  patientId, 
  mockData 
}) => {
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call or use mock data
    const loadPatientData = async () => {
      setLoading(true);
      
      if (mockData) {
        // Use provided mock data
        setTimeout(() => {
          setPatientData(mockData);
          setLoading(false);
        }, 1500);
      } else if (patientId) {
        // Simulate API call
        try {
          // Replace with actual API call
          setTimeout(() => {
            setPatientData(mockData || null);
            setLoading(false);
          }, 2000);
        } catch (error) {
          console.error('Error loading patient data:', error);
          setLoading(false);
        }
      }
    };

    loadPatientData();
  }, [patientId, mockData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Patient Not Found</CardTitle>
            <CardDescription>
              Unable to load patient data. Please check the patient ID and try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-muted rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Patient Dashboard</h1>
                <p className="text-muted-foreground">Comprehensive health overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary">
                <Activity className="h-3 w-3 mr-1" />
                Active Case
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Information - Always visible */}
          <div className="lg:col-span-1">
            <PatientInfo patient={patientData.recent_patient_record} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="labs">Lab Results</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <MedicalHistory history={patientData.medical_history} />
                <LabResults 
                  observations={patientData.recent_patient_record?.entry?.filter(
                    (entry: any) => entry.resource.resourceType === 'Observation'
                  )} 
                />
              </TabsContent>

              <TabsContent value="labs" className="space-y-6">
                <LabResults 
                  observations={patientData.recent_patient_record?.entry?.filter(
                    (entry: any) => entry.resource.resourceType === 'Observation'
                  )} 
                  detailed={true}
                />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <DiagnosticReports 
                  reports={patientData.recent_patient_record?.entry?.filter(
                    (entry: any) => entry.resource.resourceType === 'DiagnosticReport'
                  )}
                />
              </TabsContent>

              <TabsContent value="treatment" className="space-y-6">
                <TreatmentRecommendations 
                  treatments={patientData.treatment_options}
                  score={patientData.score}
                  rationale={patientData.rationale}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PatientDashboard;