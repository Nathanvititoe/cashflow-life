import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";

import { Icon } from "../../../interfaces/User";

interface ProfessionIconProps {
  icon: Icon;
  size: number;
  color: string;
}

const ProfessionIcon: React.FC<ProfessionIconProps> = ({ icon, size, color }) => {
  switch (icon.library) {
    case "FontAwesome6":
      return <FontAwesome6 name={icon.name} size={size} color={color} />;
    case "MaterialIcons":
      return <MaterialIcons name={icon.name as any} size={size} color={color} />;
    case "Octicons":
      return <Octicons name={icon.name as any} size={size} color={color} />;
    case "Entypo":
      return <Entypo name={icon.name as any} size={size} color={color} />;
    case "FontAwesome5":
      return <FontAwesome5 name={icon.name} size={size} color={color} />;
    case "AntDesign":
      return <AntDesign name={icon.name as any} size={size} color={color} />;
    default:
      return <AntDesign name="questioncircle" size={size} color={color} />;
  }
};

export default ProfessionIcon;
