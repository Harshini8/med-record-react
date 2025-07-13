import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Stethoscope, 
  TrendingUp, 
  CheckCircle,
  Info,
  AlertTriangle,
  Star,
  Brain,
  Target
} from 'lucide-react';

interface TreatmentRecommendationsProps {
  treatments?: string[];
  score?: number;
  rationale?: string;
}

export const TreatmentRecommendations: React.FC<TreatmentRecommendationsProps> = ({ 
  treatments, 
  score, 
  rationale 
}) => {
  if (!treatments || treatments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Treatment Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No treatment recommendations available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'destructive';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="h-4 w-4" />;
    if (score >= 6) return <Info className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getConfidenceText = (score: number) => {
    if (score >= 8) return 'High Confidence';
    if (score >= 6) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  const parseTreatmentOption = (treatment: string) => {
    // Try to extract key information from treatment string
    const parts = treatment.split(';');
    const mainTreatment = parts[0];
    const details = parts.slice(1);
    
    // Check for medication patterns
    const medicationMatch = mainTreatment.match(/(\w+)\s+(\d+)\s*mg/i);
    const medication = medicationMatch ? {
      name: medicationMatch[1],
      dose: medicationMatch[2] + ' mg'
    } : null;
    
    // Check for lifestyle recommendations
    const isLifestyle = mainTreatment.toLowerCase().includes('lifestyle') || 
                       mainTreatment.toLowerCase().includes('diet') || 
                       mainTreatment.toLowerCase().includes('exercise');
    
    return {
      text: treatment,
      medication,
      isLifestyle,
      details
    };
  };

  return (
    <div className="space-y-6">
      {/* Confidence Score Card */}
      {score !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Confidence Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getConfidenceIcon(score)}
                <span className="font-medium">{getConfidenceText(score)}</span>
              </div>
              <Badge variant={getConfidenceColor(score) as any}>
                {score}/10
              </Badge>
            </div>
            
            <Progress value={score * 10} className="h-2" />
            
            {rationale && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Clinical Rationale</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rationale}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Treatment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Evidence-Based Treatment Plan</span>
            <Badge variant="outline" className="ml-auto">
              {treatments.length} {treatments.length === 1 ? 'recommendation' : 'recommendations'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatments.map((treatment, index) => {
              const parsed = parseTreatmentOption(treatment);
              
              return (
                <div 
                  key={index}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                        {index + 1}
                      </div>
                      <Badge variant={parsed.isLifestyle ? 'secondary' : 'default'} className="text-xs">
                        {parsed.isLifestyle ? 'Lifestyle' : 'Medication'}
                      </Badge>
                    </div>
                    <Star className="h-4 w-4 text-warning" />
                  </div>
                  
                  <div className="space-y-3">
                    {parsed.medication && (
                      <div className="space-y-2">
                        <h4 className="font-medium">{parsed.medication.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Dosage: {parsed.medication.dose}</span>
                          <span>Daily frequency: As prescribed</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Treatment Details</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {parsed.text}
                      </p>
                    </div>
                    
                    {parsed.isLifestyle && (
                      <div className="p-3 bg-success-muted rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-success">
                            Lifestyle Intervention
                          </span>
                        </div>
                        <p className="text-xs text-success/80">
                          Non-pharmacological approach with proven cardiovascular benefits
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Guidelines
                    </Button>
                    <Button size="sm">
                      Add to Plan
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Treatment Notes */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <span>Important Notes</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All treatment recommendations should be reviewed with the attending physician</li>
              <li>• Monitor patient response and adjust dosages as clinically indicated</li>
              <li>• Schedule follow-up appointments for treatment efficacy assessment</li>
              <li>• Consider patient comorbidities and drug interactions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};