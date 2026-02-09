import { AppConfig } from '../ConfigurationModal';

export type AgentType = 'Support-Coordinator' | 'Technical-Specialist';

export interface SimulationSelection {
  callingAgent: AgentType;
  targetRoute: AgentType;
  withAuthorization: boolean;
}

export interface SimulationResult {
  selection: SimulationSelection;
  scenarioLabel: string;
  tokenReceived: string | null;
  response: any;
  statusCode: number;
  timestamp: Date;
}

export interface AgentSimulatorProps {
  config: AppConfig;
  onOpenConfig: () => void;
}

/**
 * Derive the expected outcome description based on the selection.
 */
export function getExpectedOutcome(selection: SimulationSelection): {
  label: string;
  color: 'green' | 'yellow' | 'red';
} {
  if (!selection.withAuthorization) {
    return { label: 'Expected: Unauthorized (401)', color: 'red' };
  }
  if (selection.callingAgent === selection.targetRoute) {
    return { label: 'Expected: Success (200)', color: 'green' };
  }
  return { label: 'Expected: Denied (403)', color: 'yellow' };
}

/**
 * Build a human-readable label describing the scenario.
 */
export function getScenarioLabel(selection: SimulationSelection): string {
  const auth = selection.withAuthorization ? 'with auth' : 'without auth';
  return `${selection.callingAgent} → ${selection.targetRoute} (${auth})`;
}
