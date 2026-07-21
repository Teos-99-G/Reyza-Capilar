import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "", size }: LucideIconProps) {
  // Intentar encontrar el icono por nombre directo (ej: 'Zap')
  const IconComponent = (Icons as any)[name];

  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  // Búsqueda flexible insensible a mayúsculas/minúsculas o nombres alternativos
  const foundKey = Object.keys(Icons).find(
    (key) => key.toLowerCase() === name.toLowerCase().replace(/[-_ ]/g, "")
  );

  if (foundKey) {
    const FlexibleComponent = (Icons as any)[foundKey];
    return <FlexibleComponent className={className} size={size} />;
  }

  // Icono por defecto en caso de no encontrarse
  const FallbackIcon = Icons.Sparkles;
  return <FallbackIcon className={className} size={size} />;
}
