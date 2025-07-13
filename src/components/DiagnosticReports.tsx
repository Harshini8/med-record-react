import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface DiagnosticReportsProps {
  reports: any[];
}

export const DiagnosticReports: React.FC<DiagnosticReportsProps> = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Diagnostic Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No diagnostic reports available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportIcon = (category: string) => {
    const cat = category?.toLowerCase();
    if (cat?.includes('lab')) return <FileText className="h-5 w-5 text-primary" />;
    if (cat?.includes('radiology')) return <FileText className="h-5 w-5 text-blue-500" />;
    if (cat?.includes('cardiology')) return <FileText className="h-5 w-5 text-red-500" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'final': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'preliminary': return <Info className="h-4 w-4 text-warning" />;
      case 'corrected': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getConclusionSeverity = (conclusion: string) => {
    const lower = conclusion?.toLowerCase() || '';
    if (lower.includes('elevated') || lower.includes('high') || lower.includes('abnormal')) {
      return 'warning';
    }
    if (lower.includes('critical') || lower.includes('urgent') || lower.includes('severe')) {
      return 'destructive';
    }
    if (lower.includes('normal') || lower.includes('within range')) {
      return 'success';
    }
    return 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Diagnostic Reports</span>
          <Badge variant="outline" className="ml-auto">
            {reports.length} {reports.length === 1 ? 'report' : 'reports'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((entry, index) => {
            const report = entry.resource;
            const category = report.category?.[0]?.coding?.[0]?.code || 'Unknown';
            const reportName = report.code?.coding?.[0]?.display || 'Diagnostic Report';
            const status = report.status;
            const conclusion = report.conclusion;
            const presentedForm = report.presentedForm?.[0];
            
            return (
              <div 
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getReportIcon(category)}
                    <div>
                      <h4 className="font-medium">{reportName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(status)}
                          <span className="text-xs text-muted-foreground capitalize">
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {presentedForm && (
                      <>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Report Date: {formatDate(report.effectiveDateTime)}</span>
                  </div>
                  
                  {conclusion && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Clinical Conclusion</h5>
                      <div className="p-3 rounded-lg bg-muted">
                        <Badge 
                          variant={getConclusionSeverity(conclusion) as any}
                          className="mb-2"
                        >
                          {getConclusionSeverity(conclusion) === 'success' ? 'Normal' : 
                           getConclusionSeverity(conclusion) === 'warning' ? 'Attention Required' :
                           getConclusionSeverity(conclusion) === 'destructive' ? 'Critical' : 'Review Required'}
                        </Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conclusion}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {report.result && report.result.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Associated Results</h5>
                      <div className="flex flex-wrap gap-2">
                        {report.result.map((result: any, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {result.reference.split('/')[1]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {presentedForm && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Report Details</h5>
                      <div className="text-sm text-muted-foreground">
                        <p>Title: {presentedForm.title}</p>
                        <p>Format: {presentedForm.contentType}</p>
                        {presentedForm.size && <p>Size: {(presentedForm.size / 1024).toFixed(1)} KB</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};