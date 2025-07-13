import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText,
  AlertCircle,
  Calendar
} from 'lucide-react';

interface MedicalHistoryProps {
  history: string[];
}

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Medical History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No medical history available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const parseHistoryEntry = (entry: string) => {
    try {
      return JSON.parse(entry);
    } catch (error) {
      return null;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getSeverityColor = (diagnosis: string) => {
    const lowerDiagnosis = diagnosis.toLowerCase();
    if (lowerDiagnosis.includes('hypertension') || lowerDiagnosis.includes('diabetes')) {
      return 'warning';
    }
    if (lowerDiagnosis.includes('critical') || lowerDiagnosis.includes('severe')) {
      return 'destructive';
    }
    return 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Medical History</span>
          <Badge variant="outline" className="ml-auto">
            {history.length} {history.length === 1 ? 'record' : 'records'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((entry, index) => {
            const parsedEntry = parseHistoryEntry(entry);
            
            if (!parsedEntry) {
              return (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Unable to parse medical record
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Raw data: {entry.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {formatDate(parsedEntry.encounter_date)}
                    </span>
                  </div>
                  <Badge 
                    variant={getSeverityColor(parsedEntry.diagnosis) as any}
                    className="text-xs"
                  >
                    {parsedEntry.diagnosis}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Clinical Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {parsedEntry.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};