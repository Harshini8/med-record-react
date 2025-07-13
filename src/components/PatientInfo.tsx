import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Mail,
  IdCard
} from 'lucide-react';

interface PatientInfoProps {
  patient: any;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  const patientResource = patient?.entry?.find(
    (entry: any) => entry.resource.resourceType === 'Patient'
  )?.resource;

  if (!patientResource) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Patient Information Unavailable</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const fullName = `${patientResource.name?.[0]?.given?.[0] || ''} ${patientResource.name?.[0]?.family || ''}`.trim();
  const age = patientResource.birthDate ? calculateAge(patientResource.birthDate) : null;
  const phone = patientResource.telecom?.find((t: any) => t.system === 'phone')?.value;
  const email = patientResource.telecom?.find((t: any) => t.system === 'email')?.value;
  const address = patientResource.address?.[0]?.line?.[0];
  const country = patientResource.address?.[0]?.country;

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-muted rounded-full">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{fullName || 'Unknown Patient'}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                ID: {patientResource.identifier?.[0]?.value || 'N/A'}
              </Badge>
              <Badge 
                variant={patientResource.gender === 'male' ? 'default' : 'outline'}
                className="text-xs"
              >
                {patientResource.gender || 'Not specified'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Demographics */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Demographics
          </h4>
          
          {patientResource.birthDate && (
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">
                  {new Date(patientResource.birthDate).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground">
                  {age} years old
                </p>
              </div>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{phone}</p>
                <p className="text-muted-foreground">Mobile</p>
              </div>
            </div>
          )}
          
          {email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{email}</p>
                <p className="text-muted-foreground">Email</p>
              </div>
            </div>
          )}
          
          {(address || country) && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{address || 'Address not specified'}</p>
                <p className="text-muted-foreground">{country || ''}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <IdCard className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Contact Patient
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};