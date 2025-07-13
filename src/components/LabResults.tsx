import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Heart,
  Droplets,
  Zap
} from 'lucide-react';

interface LabResultsProps {
  observations: any[];
  detailed?: boolean;
}

export const LabResults: React.FC<LabResultsProps> = ({ observations, detailed = false }) => {
  if (!observations || observations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Lab Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No lab results available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getValueStatus = (value: number, referenceRange?: any) => {
    if (!referenceRange) return 'normal';
    
    const low = referenceRange.low?.value;
    const high = referenceRange.high?.value;
    
    if (low !== undefined && value < low) return 'low';
    if (high !== undefined && value > high) return 'high';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'abnormal';
      case 'low': return 'warning';
      case 'critical': return 'destructive';
      default: return 'normal';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <TrendingDown className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getTestIcon = (testName: string) => {
    const name = testName.toLowerCase();
    if (name.includes('blood pressure')) return <Heart className="h-5 w-5" />;
    if (name.includes('cholesterol') || name.includes('lipid')) return <Droplets className="h-5 w-5" />;
    if (name.includes('glucose') || name.includes('hba1c')) return <Zap className="h-5 w-5" />;
    return <Activity className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProgressValue = (value: number, referenceRange?: any) => {
    if (!referenceRange) return 50;
    
    const low = referenceRange.low?.value || 0;
    const high = referenceRange.high?.value || 100;
    const range = high - low;
    
    if (range === 0) return 50;
    
    const percentage = ((value - low) / range) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Lab Results & Vital Signs</span>
          <Badge variant="outline" className="ml-auto">
            {observations.length} results
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${detailed ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {observations.map((entry, index) => {
            const obs = entry.resource;
            
            // Handle Blood Pressure specially
            if (obs.component && obs.code?.coding?.[0]?.display?.includes('pressure')) {
              const systolic = obs.component.find((c: any) => c.code.display === 'Systolic')?.valueQuantity;
              const diastolic = obs.component.find((c: any) => c.code.display === 'Diastolic')?.valueQuantity;
              
              const bpStatus = (systolic?.value > 140 || diastolic?.value > 90) ? 'high' : 
                              (systolic?.value < 90 || diastolic?.value < 60) ? 'low' : 'normal';
              
              return (
                <div key={index} className={`p-4 border rounded-lg ${detailed ? 'space-y-4' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTestIcon('blood pressure')}
                      <h4 className="font-medium">Blood Pressure</h4>
                    </div>
                    <Badge variant={getStatusColor(bpStatus) as any} className="text-xs">
                      {getStatusIcon(bpStatus)}
                      <span className="ml-1 capitalize">{bpStatus}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        {systolic?.value}/{diastolic?.value}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {systolic?.unit}
                      </span>
                    </div>
                    
                    {detailed && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Systolic: {systolic?.value} {systolic?.unit}</span>
                          <span>Diastolic: {diastolic?.value} {diastolic?.unit}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Measured: {formatDate(obs.effectiveDateTime)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            // Handle single-value observations
            if (obs.valueQuantity) {
              const value = obs.valueQuantity.value;
              const unit = obs.valueQuantity.unit;
              const referenceRange = obs.valueQuantity.referenceRange?.[0];
              const status = getValueStatus(value, referenceRange);
              const testName = obs.code?.coding?.[0]?.display || 'Unknown Test';
              
              return (
                <div key={index} className={`p-4 border rounded-lg ${detailed ? 'space-y-4' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTestIcon(testName)}
                      <h4 className="font-medium">{testName}</h4>
                    </div>
                    <Badge variant={getStatusColor(status) as any} className="text-xs">
                      {getStatusIcon(status)}
                      <span className="ml-1 capitalize">{status}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{value}</span>
                      <span className="text-sm text-muted-foreground">{unit}</span>
                    </div>
                    
                    {referenceRange && detailed && (
                      <div className="space-y-2">
                        <Progress 
                          value={calculateProgressValue(value, referenceRange)} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Normal: {referenceRange.low?.value} - {referenceRange.high?.value} {unit}</span>
                        </div>
                      </div>
                    )}
                    
                    {detailed && (
                      <div className="text-xs text-muted-foreground">
                        Measured: {formatDate(obs.effectiveDateTime)}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            return null;
          }).filter(Boolean)}
        </div>
      </CardContent>
    </Card>
  );
};