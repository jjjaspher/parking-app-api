export interface Agent {
  date: string;                    // Format: YYYY-MM-DD
  agent_id: string;                // Format: XXX-XXX-XXX
  agent_name: string;              // Example: "Koko"
  agent_surname: string;           // Example: "Krunch"
  agent_username: string;          // Example: "koko01"
  agent_password: string;          // Example: "kk01"
  profile_img?: string;             // Example: URL or base64 string, currently empty
  created_by_admin_admin_id: string; // Format: XXX-XXX
}