interface SecurityTool {
  name: string;
  description: string;
  generateCode(): string;
}

class FirewallRuleGenerator implements SecurityTool {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  generateCode(): string {
    return `firewall_rule ${this.name} {
      description: "${this.description}"
      action: drop
    }`;
  }
}

class AccessControlListGenerator implements SecurityTool {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  generateCode(): string {
    return `acl ${this.name} {
      description: "${this.description}"
      allow: all
    }`;
  }
}

class InteractiveSecurityToolGenerator {
  private securityTools: SecurityTool[];

  constructor() {
    this.securityTools = [];
  }

  addSecurityTool(securityTool: SecurityTool) {
    this.securityTools.push(securityTool);
  }

  generateSecurityConfiguration(): string {
    let configuration = '';
    for (const securityTool of this.securityTools) {
      configuration += securityTool.generateCode() + '\n';
    }
    return configuration;
  }
}

// Test case
const generator = new InteractiveSecurityToolGenerator();
generator.addSecurityTool(new FirewallRuleGenerator('block_facebook', 'Block Facebook traffic'));
generator.addSecurityTool(new AccessControlListGenerator('allow_office_network', 'Allow office network traffic'));

console.log(generator.generateSecurityConfiguration());