import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const patients = [
  {
    id: "P003",
    name: "Rajesh Iyer",
    age: 43,
    gender: "Male",
    phone: "+91-98888-77777",
    location: "Chennai, Tamil Nadu",
    lastVisit: "2025-08-22",
    condition: "Hypertension, High Cholesterol",
    status: "Active"
  },
  {
    id: "P001",
    name: "Priya Sharma",
    age: 35,
    gender: "Female",
    phone: "+91-98765-43210",
    location: "Mumbai, Maharashtra",
    lastVisit: "2025-08-20",
    condition: "Diabetes Type 2",
    status: "Active"
  },
  {
    id: "P002",
    name: "Amit Kumar",
    age: 28,
    gender: "Male",
    phone: "+91-87654-32109",
    location: "Delhi, NCR",
    lastVisit: "2025-08-18",
    condition: "Routine Checkup",
    status: "Inactive"
  },
  {
    id: "P004",
    name: "Sunita Patel",
    age: 52,
    gender: "Female",
    phone: "+91-76543-21098",
    location: "Ahmedabad, Gujarat",
    lastVisit: "2025-08-21",
    condition: "Thyroid Disorder",
    status: "Active"
  },
  {
    id: "P005",
    name: "Ravi Reddy",
    age: 38,
    gender: "Male",
    phone: "+91-65432-10987",
    location: "Hyderabad, Telangana",
    lastVisit: "2025-08-19",
    condition: "Heart Disease",
    status: "Active"
  }
];

export default function PatientsList() {
  const navigate = useNavigate();

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-text mb-2">
            Patients Directory
          </h1>
          <p className="text-medical-text-secondary">
            Manage and view patient records
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Card 
              key={patient.id} 
              className="hover:shadow-medical-soft transition-all duration-200 cursor-pointer border-medical-border hover:border-medical-primary/30"
              onClick={() => handlePatientClick(patient.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-medical-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-medical-text">
                        {patient.name}
                      </CardTitle>
                      <p className="text-sm text-medical-text-secondary">
                        ID: {patient.id}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={patient.status === "Active" ? "default" : "secondary"}
                    className={patient.status === "Active" 
                      ? "bg-medical-success/10 text-medical-success border-medical-success/20" 
                      : "bg-medical-muted text-medical-text-secondary"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-medical-text-secondary">
                  <User className="w-4 h-4" />
                  <span>{patient.age} years, {patient.gender}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-medical-text-secondary">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-medical-text-secondary">
                  <MapPin className="w-4 h-4" />
                  <span>{patient.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-medical-text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
                
                <div className="pt-2 border-t border-medical-border">
                  <p className="text-sm font-medium text-medical-text mb-1">
                    Current Condition:
                  </p>
                  <p className="text-sm text-medical-text-secondary">
                    {patient.condition}
                  </p>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-medical-primary hover:bg-medical-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePatientClick(patient.id);
                  }}
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}