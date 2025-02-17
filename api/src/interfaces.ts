export interface FlagrFlag {
  id: number;
  key: string;
  description: string;
  enabled: boolean;
  tags: {
    id: number;
    value: string;
  }[];
  segments: {
    id: number;
    description: string;
    constraints: {
      id: number;
      property: string;
      operator: string;
      value: string;
    }[];
    distributions: {
      id: number;
      percent: number;
      variantKey: string;
      variantID: number;
    }[];
    rank: number;
    rolloutPercent: number;
  }[];
  variants: {
    id: number;
    key: string;
    attachment: Record<string, unknown>;
  }[];
  dataRecordsEnabled: boolean;
  entityType: string;
  notes: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
}

export interface FlagrEvaluateRequest {
  entityID: string;
  entityType: string;
  entityContext: {};
  enableDebug: boolean;
  flagID: number;
  flagKey?: string;
  flagTags?: string[];
  flagTagsOperator: string;
}

export interface FlagrEvaluateResponse {
  flagID: number;
  flagKey: string;
  flagSnapshotID: number;
  segmentID: number;
  variantID: number;
  variantKey: string;
  variantAttachment: Record<string, unknown>;
  evalContext: {
    entityID: string;
    entityType: string;
    entityContext: Record<string, unknown>;
    enableDebug: boolean;
    flagID: number;
    flagKey: string;
    flagTags: string[];
    flagTagsOperator: string;
  };
  timestamp: string;
  evalDebugLog: {
    segmentDebugLogs: {
      segmentID: number;
      msg: string;
    }[];
    msg: string;
  };
}