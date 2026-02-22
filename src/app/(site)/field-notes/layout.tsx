import type { ReactNode } from "react";
import FieldNotesTemplate from "../../../../components/templates/FieldNotesTemplate";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <FieldNotesTemplate>
      {children}
    </FieldNotesTemplate>
  )
}
