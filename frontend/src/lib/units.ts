/**
 * Area Unit Conversion Utilities
 * Supports common Indian land measurement units
 */

export type AreaUnit = 'sqft' | 'sqm' | 'guntha' | 'acre' | 'marla';

// Conversion factors: value in sq ft
const TO_SQFT: Record<AreaUnit, number> = {
  sqft: 1,
  sqm: 10.7639, // 1 sq m = 10.7639 sq ft
  guntha: 1089, // 1 Guntha = 1089 sq ft (India)
  acre: 43560, // 1 Acre = 43560 sq ft
  marla: 272.25, // 1 Marla = 272.25 sq ft (India)
};

const UNIT_LABELS: Record<AreaUnit, string> = {
  sqft: 'Sq Ft',
  sqm: 'Sq M',
  guntha: 'Guntha',
  acre: 'Acre',
  marla: 'Marla',
};

/**
 * Convert area from one unit to another
 */
export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  if (from === to) return value;

  // Convert to sq ft first, then to target unit
  const sqftValue = value * TO_SQFT[from];
  return sqftValue / TO_SQFT[to];
}

/**
 * Format area with appropriate decimal places
 */
export function formatArea(value: number, unit: AreaUnit, decimals = 2): string {
  const formatted = value.toFixed(decimals);
  // Remove trailing zeros after decimal
  const cleaned = parseFloat(formatted).toString();
  return `${cleaned} ${UNIT_LABELS[unit]}`;
}

/**
 * Get all supported units
 */
export function getAreaUnits(): { value: AreaUnit; label: string }[] {
  return Object.entries(UNIT_LABELS).map(([value, label]) => ({
    value: value as AreaUnit,
    label,
  }));
}

/**
 * Convert area to all units (returns object with all conversions)
 */
export function convertToAllUnits(value: number, from: AreaUnit): Record<AreaUnit, number> {
  const sqftValue = value * TO_SQFT[from];

  return {
    sqft: sqftValue / TO_SQFT.sqft,
    sqm: sqftValue / TO_SQFT.sqm,
    guntha: sqftValue / TO_SQFT.guntha,
    acre: sqftValue / TO_SQFT.acre,
    marla: sqftValue / TO_SQFT.marla,
  };
}
