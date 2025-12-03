import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import type { TUserRole } from "../../login/types/TUserRole";

export interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

export const MENU_ITEMS: Record<TUserRole, MenuItem[]> = {
  TEACHER: [
    {
      label: "Realizar Doação",
      icon: VolunteerActivismIcon,
      path: "/doacao",
    },
    {
      label: "Extrato",
      icon: ReceiptLongIcon,
      path: "/extrato",
    },
  ],

  STUDENT: [
    {
      label: "Resgatar Vantagens",
      icon: CardGiftcardIcon,
      path: "/vantagens",
    },
    {
      label: "Extrato",
      icon: ReceiptLongIcon,
      path: "/extrato",
    },
  ],

  COMPANY: [
    {
      label: "Cadastrar Vantagens",
      icon: CardGiftcardIcon,
      path: "/vantagens",
    },
  ],

  ADMIN: [
    {
      label: "Gerenciar Alunos",
      icon: SchoolIcon,
      path: "/alunos",
    },
    {
      label: "Gerenciar Professores",
      icon: PeopleIcon,
      path: "/professores",
    },
    {
      label: "Gerenciar Empresas",
      icon: BusinessIcon,
      path: "/empresas",
    },
  ],
};
