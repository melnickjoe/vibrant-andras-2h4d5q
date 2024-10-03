import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";
import { Textarea } from "/components/ui/textarea";

const hazardsLibrary = [
  { id: 1, name: 'Electrical Shock', severity: 'High', probability: 0.01 },
  { id: 2, name: 'Fire', severity: 'High', probability: 0.005 },
  { id: 3, name: 'Mechanical Failure', severity: 'Medium', probability: 0.05 },
];

const faultTreeLibrary = [
  { id: 1, name: 'Power Supply Failure', probability: 0.02 },
  { id: 2, name: 'Component Failure', probability: 0.01 },
  { id: 3, name: 'Human Error', probability: 0.05 },
];

const riskControlMeasures = [
  { id: 1, name: 'Regular Maintenance', effectiveness: 0.8 },
  { id: 2, name: 'Operator Training', effectiveness: 0.7 },
  { id: 3, name: 'Design Redundancy', effectiveness: 0.9 },
];

const RiskAnalysisSimulator = () => {
  const [intendedUse, setIntendedUse] = useState('');
  const [useCase, setUseCase] = useState('');
  const [indicationsForUse, setIndicationsForUse] = useState('');
  const [selectedHazards, setSelectedHazards] = useState([]);
  const [selectedFaultTreeEvents, setSelectedFaultTreeEvents] = useState([]);
  const [selectedRiskControlMeasures, setSelectedRiskControlMeasures] = useState([]);
  const [initialRiskScore, setInitialRiskScore] = useState(0);
  const [finalRiskScore, setFinalRiskScore] = useState(0);

  const handleHazardsSelection = (hazard) => {
    if (selectedHazards.includes(hazard)) {
      setSelectedHazards(selectedHazards.filter((h) => h !== hazard));
    } else {
      setSelectedHazards([...selectedHazards, hazard]);
    }
  };

  const handleFaultTreeEventsSelection = (event) => {
    if (selectedFaultTreeEvents.includes(event)) {
      setSelectedFaultTreeEvents(selectedFaultTreeEvents.filter((e) => e !== event));
    } else {
      setSelectedFaultTreeEvents([...selectedFaultTreeEvents, event]);
    }
  };

  const handleRiskControlMeasuresSelection = (measure) => {
    if (selectedRiskControlMeasures.includes(measure)) {
      setSelectedRiskControlMeasures(selectedRiskControlMeasures.filter((m) => m !== measure));
    } else {
      setSelectedRiskControlMeasures([...selectedRiskControlMeasures, measure]);
    }
  };

  const calculateInitialRiskScore = () => {
    const hazardsProbabilities = selectedHazards.map((hazard) => hazard.probability);
    const faultTreeProbabilities = selectedFaultTreeEvents.map((event) => event.probability);
    const combinedProbabilities = hazardsProbabilities.concat(faultTreeProbabilities);
    const initialRiskScore = combinedProbabilities.reduce((a, b) => a + b, 0);
    setInitialRiskScore(initialRiskScore);
  };

  const calculateFinalRiskScore = () => {
    const riskControlMeasuresEffectiveness = selectedRiskControlMeasures.map((measure) => measure.effectiveness);
    const finalRiskScore = initialRiskScore * (1 - riskControlMeasuresEffectiveness.reduce((a, b) => a + b, 0) / riskControlMeasuresEffectiveness.length);
    setFinalRiskScore(finalRiskScore);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis Simulator</CardTitle>
          <CardDescription>Compliant with ISO 14971</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="intended-use">Intended Use:</Label>
            <Input id="intended-use" value={intendedUse} onChange={(e) => setIntendedUse(e.target.value)} />
            <Label htmlFor="use-case">Use Case:</Label>
            <Input id="use-case" value={useCase} onChange={(e) => setUseCase(e.target.value)} />
            <Label htmlFor="indications-for-use">Indications for Use:</Label>
            <Input id="indications-for-use" value={indicationsForUse} onChange={(e) => setIndicationsForUse(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hazards Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap space-x-2">
            {hazardsLibrary.map((hazard) => (
              <Button key={hazard.id} variant="outline" onClick={() => handleHazardsSelection(hazard)}>
                {hazard.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fault Tree Events Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap space-x-2">
            {faultTreeLibrary.map((event) => (
              <Button key={event.id} variant="outline" onClick={() => handleFaultTreeEventsSelection(event)}>
                {event.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Risk Control Measures Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap space-x-2">
            {riskControlMeasures.map((measure) => (
              <Button key={measure.id} variant="outline" onClick={() => handleRiskControlMeasuresSelection(measure)}>
                {measure.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Risk Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Label>Initial Risk Score:</Label>
            <Input value={initialRiskScore} readOnly />
            <Button variant="primary" onClick={calculateInitialRiskScore}>
              Calculate Initial Risk Score
            </Button>
            <Label>Final Risk Score:</Label>
            <Input value={finalRiskScore} readOnly />
            <Button variant="primary" onClick={calculateFinalRiskScore}>
              Calculate Final Risk Score
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Label>Selected Hazards:</Label>
            <Textarea value={selectedHazards.map((hazard) => hazard.name).join(', ')} readOnly />
            <Label>Selected Fault Tree Events:</Label>
            <Textarea value={selectedFaultTreeEvents.map((event) => event.name).join(', ')} readOnly />
            <Label>Selected Risk Control Measures:</Label>
            <Textarea value={selectedRiskControlMeasures.map((measure) => measure.name).join(', ')} readOnly />
            <Label>Initial Risk Score:</Label>
            <Input value={initialRiskScore} readOnly />
            <Label>Final Risk Score:</Label>
            <Input value={finalRiskScore} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysisSimulator;