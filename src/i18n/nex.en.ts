// NEX ERP copy (English). Source: docs/nex-erp-brief.md, sections 1–7. Terms follow the glossary (§9).
// No invented numbers, clients, prices or features. Sample data in previews is labelled as such.

const nexEn = {
  name: 'NEX ERP',

  hero: {
    eyebrow: 'Cloud ERP, Arabic first',
    titleLead: 'From the offer to maintenance.',
    titleAccent: 'One system:',
    titleAccentLast: 'NEX ERP.',
    lead: 'NEX ERP is a cloud ERP from {brand} that runs the whole company from the browser: quotations, contracts, installation, maintenance, invoicing and accounting entries, in one place, in Arabic and English.',
    primary: 'Request a NEX ERP demo',
    secondary: 'See the full cycle',
    audienceLabel: 'Built for',
  },

  // Owner's list for the hero (review, Oct 2026)
  audienceShort: [
    'Maintenance & operations companies',
    'Elevator companies',
    'HVAC companies',
    'Real estate development companies',
    'Contracting companies',
    'Solar energy companies',
  ],

  problem: {
    eyebrow: 'The problem',
    title: 'Most service companies run on scattered tools.',
    lead: 'Companies that sell, install, operate and maintain systems, or rent out property, usually juggle separate tools that nothing connects.',
    items: [
      {
        tool: 'Excel for pricing',
        pain: 'Offers without control, and prices that go out without the manager’s approval.',
      },
      {
        tool: 'Paper for contracts',
        pain: 'Signed contracts the accounting team never hears about.',
      },
      {
        tool: 'WhatsApp for tickets',
        pain: 'Breakdowns and preventive visits that get lost between messages.',
      },
      {
        tool: 'Separate accounting',
        pain: 'Everything typed twice, and no clear profit per project.',
      },
    ],
    answer:
      'NEX ERP connects the whole cycle: every operational step automatically creates its correct financial effect, with no re-entry.',
  },

  cycle: {
    eyebrow: 'The operation cycle',
    title: 'From the first lead to the renewal.',
    lead: 'Choose a step to see the problem it solves.',
    problemLabel: 'The problem',
    solutionLabel: 'In NEX ERP',
    steps: [
      {
        label: 'Lead',
        problem: 'Leads live in notebooks and phones, and follow-up depends on memory.',
        solution:
          'Leads and opportunities sit in the CRM, and a lead becomes a customer automatically when the offer is accepted.',
      },
      {
        label: 'Offer',
        problem: 'Excel offers with no control and no record of why customers said no.',
        solution:
          'Project or maintenance offers with tax per line, milestones, refundable deposits, and a professional PDF in Arabic or English.',
      },
      {
        label: 'Manager approval',
        problem: 'Prices go out without the manager’s approval.',
        solution:
          'Offers pass through an approvals inbox by company rules: draft, pending approval, approved, then accepted or rejected with a reason.',
      },
      {
        label: 'Contract',
        problem: 'Signed contracts the accounting team never hears about.',
        solution:
          'The contract is a full copy of the accepted offer, with no re-entry. Changes go through approved amendments.',
      },
      {
        label: 'Contract activation',
        problem: 'Every department re-enters the same contract.',
        solution:
          'One click creates the sales order, billing plan, project, subcontractor purchases and field jobs.',
      },
      {
        label: 'Installation',
        problem: 'Jobs get closed with steps skipped.',
        solution:
          'Calendar booking without overlaps, mandatory checklists and customer sign-off. Parts are issued to the contract’s project.',
      },
      {
        label: 'Commissioning',
        problem: 'Handover happens without a record.',
        solution:
          'Its own job and checklist: commissioning tests, customer training and a handover record. It can trigger a milestone invoice.',
      },
      {
        label: 'Inspection & certificates',
        problem: 'Civil defence certificates expire without anyone noticing.',
        solution:
          'Inspection checklists per operation line, and certificates with expiry dates and automatic reminders.',
      },
      {
        label: 'Maintenance contract',
        problem: 'Preventive visits never happen, and customers dispute what the contract covers.',
        solution:
          'Set the number of preventive visits a year and the system plans them. Covered and uncovered parts are clear.',
      },
      {
        label: 'Tickets',
        problem: 'Breakdowns reported on WhatsApp get lost.',
        solution:
          'Tickets with priority and SLA, technician booking and checklists. Uncovered parts create a sales order automatically.',
      },
      {
        label: 'Billing & profit',
        problem: 'Maintenance invoices run months late, and nobody knows the profit per project.',
        solution:
          'Bill what is due per contract or for all contracts at once, and see each project’s P&L from the general ledger.',
      },
    ],
  },

  previews: {
    eyebrow: 'Inside NEX ERP',
    title: 'A look at the system.',
    lead: 'Four everyday moments, from activating a contract to closing a maintenance ticket.',
    note: 'Illustration with sample data',
    tabs: {
      activation: 'Contract activation',
      occupancy: 'Occupancy board',
      pnl: 'Project P&L',
      ticket: 'Ticket & checklist',
    },
    activation: {
      number: 'ELV-C-000001',
      contract: 'Sample tower: passenger lift',
      type: 'Project contract',
      button: 'Contract activation',
      done: 'Activated',
      replay: 'Replay',
      outputs: [
        'Sales order',
        'Billing plan · 30 / 40 / 30',
        'Project',
        'Subcontractor purchase',
        'Field jobs: installation, commissioning, inspection',
      ],
    },
    occupancy: {
      building: 'Sample building',
      floor: 'Floor',
      statuses: { rented: 'Rented', reserved: 'Reserved', blocked: 'Blocked', vacant: 'Vacant' },
    },
    pnl: {
      title: 'Project P&L',
      project: 'ELV-C-000001 · Sample tower',
      contractValue: 'Contract value',
      invoiced: 'Invoiced',
      actualCost: 'Actual cost',
      completion: 'Completion',
      margin: 'Estimated margin',
    },
    ticket: {
      number: 'ELV-J-000042',
      title: 'Lift stuck between floors',
      priority: 'High priority',
      technicianLabel: 'Assigned technician',
      technician: 'Field technician 1',
      checklistTitle: 'Mandatory checklist',
      items: [
        'Isolate power and secure the car',
        'Release passengers safely',
        'Inspect door locks and sensors',
        'Test run before handover',
      ],
      signoff: 'Customer sign-off',
      signoffHint: 'Required before the job can close',
    },
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for companies that install, maintain, build and develop.',
    segments: [
      {
        title: 'Electromechanical systems contractors',
        body: 'Elevators, HVAC, generators, solar, fire fighting and security systems: supply, installation and maintenance.',
      },
      {
        title: 'Maintenance & facility management companies',
        body: 'Annual maintenance contracts, field technician teams and service tickets.',
      },
      {
        title: 'Contracting companies',
        body: 'Building, road, finishing and infrastructure projects run as project contracts, with milestones, subcontractors and profit per project.',
      },
      {
        title: 'Real estate development companies',
        body: 'Developing buildings and then running them: projects, leads and leasing in one system.',
      },
      {
        title: 'Property owners and managers',
        body: 'Residential and commercial buildings, complexes and parking.',
      },
      {
        title: 'Top management and finance',
        body: 'Profit per project, cash flow and collections.',
      },
    ],
    sectorsTitle: 'Configured for your sector',
    sectorsLead:
      'NEX ERP is general, and shaped to each sector with operation lines, services, checklists, inspection types and certificates.',
    tested: 'Tested example',
    setup: 'Setup example',
    sectors: [
      { id: 'elevators', name: 'Elevators & escalators', kind: 'tested' },
      { id: 'hvac', name: 'HVAC & VRF', kind: 'tested' },
      { id: 'solar', name: 'Solar energy', kind: 'setup' },
      { id: 'generators', name: 'Generators', kind: 'setup' },
      { id: 'contracting', name: 'Contracting', kind: 'setup' },
      { id: 'development', name: 'Real estate development', kind: 'setup' },
    ],
  },

  why: {
    eyebrow: 'Why NEX ERP',
    title: 'Nine reasons, each backed by the system.',
    items: [
      {
        message: 'One cycle from offer to maintenance',
        proof:
          'The contract is a copy of the offer; activation creates the sales order, billing, project and jobs in one click.',
      },
      {
        message: 'No forgotten invoices',
        proof: 'Automatic billing plans and a group billing run that never duplicates.',
      },
      {
        message: 'Know the profit of every project',
        proof:
          'The project is an accounting dimension; every part and purchase invoice is charged to it.',
      },
      {
        message: 'A disciplined field team',
        proof: 'Mandatory checklists and customer sign-off before a job closes.',
      },
      {
        message: 'No certificate expires by surprise',
        proof: 'Automatic daily reminders before certificates expire.',
      },
      {
        message: 'Control and accountability',
        proof: 'Approvals, segregation of duties, permissions per action, and an audit log.',
      },
      {
        message: 'Accounting to international standards',
        proof: 'IFRS 15 over-time revenue, entries that can’t be edited, and multiple currencies.',
      },
      {
        message: 'Real Arabic',
        proof: 'Arabic and English interface and printouts, right-to-left and left-to-right.',
      },
      {
        message: 'From anywhere',
        proof: 'Cloud-based in the browser, and technicians work from the site.',
      },
    ],
  },

  modules: {
    eyebrow: 'The integrated system',
    title: 'Accounting, inventory, purchasing and HR run underneath.',
    lead: 'Operations and real estate are the core story. The rest of the system works automatically behind them, and companies pay only for the modules they need.',
    groups: [
      {
        name: 'Operations & projects',
        body: 'Offers, contracts, installation, commissioning, inspection, maintenance contracts, tickets and project profit.',
      },
      {
        name: 'Real estate',
        body: 'Properties, units and the occupancy board, leases and their billing, deposits, and paid parking.',
      },
      {
        name: 'Sales & customers',
        body: 'CRM, sales, loyalty and POS: leads and opportunities, appointments, customer cases and SLA, invoices and receivables.',
      },
      {
        name: 'Purchasing & inventory',
        body: 'Purchasing, purchase requests and tenders, inventory: foreign-currency orders, imports with landed costs, serial numbers, counts and transfers.',
      },
      {
        name: 'Finance',
        body: 'General ledger and financial statements, cash, banks and cheques, tax, fixed assets and depreciation.',
      },
      {
        name: 'Resources',
        body: 'HR and payroll: employees, attendance, leave and salaries; fleet vehicles, fuel and maintenance.',
      },
      {
        name: 'Reports & dashboards',
        body: 'Dashboards, query reports, financial ratios and scheduled reports.',
      },
      {
        name: 'Devices',
        body: 'A local device agent connects printers, cash drawers, scales, cameras and barriers to the cloud system.',
      },
    ],
  },

  realEstate: {
    eyebrow: 'Real estate',
    title: 'Rent the units and run the building, in one system.',
    body: 'A building management company can rent out units, manage the maintenance contracts for the building’s elevators, HVAC and generators, receive tenants’ tickets, run the parking, and record the building’s systems as fixed assets with their maintenance and depreciation.',
    link: 'Explore NEX ERP for real estate',
  },

  other: {
    eyebrow: 'Also from Taif Technologies',
    title: 'Need more than NEX ERP?',
    lead: 'Alongside NEX ERP, our team offers software development, IT consulting, custom solutions and computer equipment.',
    link: 'See all services',
  },

  cta: {
    title: 'See NEX ERP on your own cycle.',
    body: 'Request a demo and we’ll walk through the system with your operation lines.',
    button: 'Request a demo',
  },

  page: {
    hero: {
      eyebrow: 'NEX ERP',
      title: 'One system for operations, real estate and finance.',
      lead: 'A cloud, Arabic-first ERP that runs the whole company from the browser. Every operational step automatically creates its correct financial effect.',
    },
    lines: {
      eyebrow: 'Operation lines',
      title: 'The system takes the shape of your business.',
      body: 'Elevators, HVAC, generators, solar: each activity is an operation line with its own stages and services, set up once.',
      points: [
        'A prefix on its documents: ELV-Q-000001 for an offer, ELV-C-000001 for a contract, ELV-J-000001 for a job.',
        'The stages it uses: offer, contract, installation, commissioning, inspection, maintenance contracts, tickets and visits.',
        'The services allowed on it, and the department responsible: staff see only their own lines.',
        'An option for every contract to become a project with its own profit.',
      ],
    },
    stages: {
      eyebrow: 'Operations & maintenance',
      title: 'Every stage, from the problem to the solution.',
      items: [
        {
          title: 'Offers',
          pain: 'Excel offers without control, prices out without approval, and lost reasons for rejection.',
          points: [
            'For an existing customer or a CRM lead, who becomes a customer on acceptance.',
            'Project (supply and installation) or maintenance contracts, with tax per line and discounts.',
            'Refundable deposits outside the offer total, and milestones by percentage.',
            'Draft, pending approval, approved, accepted or rejected with a reason, then the contract.',
          ],
        },
        {
          title: 'Contracts',
          pain: 'Contracts accounting never hears about, forgotten payments, and certificates that expire unnoticed.',
          points: [
            'A full copy of the accepted offer, with one-click activation.',
            'Amendments with a new version after approval, including ownership transfer.',
            'Certificates (civil defence, insurance, guarantee, inspection) with automatic expiry reminders.',
            'Termination needs a reason, and cancels remaining billing automatically.',
          ],
        },
        {
          title: 'Installation & commissioning',
          pain: 'Jobs closed with steps skipped, and handovers without a record.',
          points: [
            'Jobs created automatically on activation, booked on the calendar without overlaps.',
            'Mandatory checklists with customer sign-off; a job can’t close until they’re done.',
            'Parts issued to the contract’s project, imported equipment tracked by serial number.',
            'Commissioning tests, customer training and a handover record.',
          ],
        },
        {
          title: 'Inspection',
          pain: 'Company specifications and regulator requirements that live on paper.',
          points: [
            'A tool to turn your specifications and regulator requirements into mandatory checklists and forms.',
            'Custom inspection types, and versioned checklist templates for audit and compliance.',
            'Dynamic forms for readings, measurements and test results, saved with the document.',
          ],
        },
        {
          title: 'Maintenance contracts',
          pain: 'Maintenance invoices months late, missed visits, and disputes over what is covered.',
          points: [
            'Set the number of preventive visits a year, and the system plans them.',
            'Comprehensive or non-comprehensive for spare parts.',
            'Periodic billing in equal instalments, with a group billing run for all contracts.',
          ],
        },
        {
          title: 'Tickets',
          pain: 'Breakdowns reported in messages that get lost.',
          points: [
            'Open, book a technician, start on arrival, checklist, complete with the solution.',
            'Covered parts go to the contract’s project; uncovered parts create a sales order.',
            'Customer cases with SLA, and a satisfaction survey after the service.',
          ],
        },
        {
          title: 'Billing & profit',
          pain: 'Nobody knows what each project really earns.',
          points: [
            'Bill what is due per contract or for all contracts at once.',
            'Project P&L: actual revenue and cost from the general ledger against contract value.',
            'Over-time revenue (IFRS 15) with automatic month-end entries.',
          ],
        },
      ],
    },
    realEstate: {
      eyebrow: 'Real estate',
      title: 'For property owners and managers.',
      lead: 'Leasing serves the landlord: properties, floors and units, leases, billing and deposits.',
      points: [
        'Properties, floors and units with their areas; generate a series of units at once.',
        'An occupancy board: each floor’s units coloured by status on any date, with tenant and end date.',
        'Leases with one tenant for several units, stepped rent and monthly to yearly billing.',
        'Automatic billing of due periods, refundable deposits, and straight-line revenue.',
      ],
      parkingTitle: 'Parking (optional)',
      parking:
        'Entry and exit lanes with plate reading, barcode tickets and barriers, tariffs by time, and shifts with a Z report.',
    },
    sectors: {
      eyebrow: 'Sectors',
      title: 'Examples of how NEX ERP is set up.',
      lead: 'There is no separate “elevators” or “solar” module: each sector is configured with the same tools. Elevators and HVAC are tested examples; the others are proposed setups.',
      items: [
        {
          id: 'elevators',
          name: 'Elevators & escalators',
          kind: 'tested',
          lines: 'ELV-INST · ELV-MNT',
          points: [
            'Offer with 30 / 40 / 30 milestones and over-time revenue, then activation.',
            'Import in euros with serial numbers and landed costs on the elevator.',
            'Lift safety checklist and civil defence certificate with renewal reminders.',
            'Annual contract with quarterly visits and prioritised breakdown tickets.',
          ],
        },
        {
          id: 'hvac',
          name: 'HVAC & VRF',
          kind: 'tested',
          lines: 'VRF-INST · VRF-MNT',
          points: [
            'Units imported in dollars and delivered by serial number.',
            'Installation, gas charging and test run with a checklist and customer sign-off.',
            'Annual contract with quarterly visits and group periodic billing.',
          ],
        },
        {
          id: 'generators',
          name: 'Generators',
          kind: 'setup',
          lines: '',
          points: [
            'Lines for supply and installation, maintenance, and optional rental as a service.',
            'Checklists for oil and filters, load test, ATS panel and batteries.',
            'Urgent tickets with high priority and an SLA in hours.',
          ],
        },
        {
          id: 'solar',
          name: 'Solar energy',
          kind: 'setup',
          lines: '',
          points: [
            'Residential and commercial lines, plus maintenance and cleaning.',
            'Survey and design, installation, connection, and approval by the utility.',
            'Panel and inverter warranties with expiry reminders, tracked by serial number.',
          ],
        },
        {
          id: 'contracting',
          name: 'Contracting',
          kind: 'setup',
          lines: '',
          points: [
            'An operation line for each type of work, with its own stages, services and document numbering.',
            'Project contracts with milestones, refundable deposits, and approved amendments for added work.',
            'Purchase requests and tenders, and subcontractor purchase orders linked to the contract.',
            'Every material and purchase invoice charged to the project, with its P&L from the general ledger.',
          ],
        },
        {
          id: 'development',
          name: 'Real estate development',
          kind: 'setup',
          lines: '',
          points: [
            'The same project tools as contracting, with profit per project.',
            'Leads and opportunities in the CRM, with appointments and follow-up.',
            'Completed buildings move to leasing: units, the occupancy board and leases.',
            'Building systems recorded as fixed assets, with their maintenance and depreciation.',
          ],
        },
      ],
    },
    facts: {
      eyebrow: 'The platform',
      title: 'Built for how companies actually work.',
      items: [
        {
          title: 'Cloud, in the browser',
          body: 'Several companies per organisation, and branches per company.',
        },
        {
          title: 'Arabic first',
          body: 'Arabic and English interface with instant right-to-left switching, and printouts in both.',
        },
        {
          title: 'Modern and fast',
          body: 'A clean, modern interface with fast keyboard entry in tables.',
        },
        {
          title: 'Precise permissions',
          body: 'A permission per action and a data scope per role, with segregation of duties.',
        },
        {
          title: 'Approvals and audit',
          body: 'An approvals inbox by company rules, an audit log of every change, and sequential numbering.',
        },
        {
          title: 'Strict accounting',
          body: 'Posted entries are reversed, never edited; fiscal periods, year-end close and multiple currencies.',
        },
      ],
    },
    roles: {
      title: 'Each role sees only what it needs',
      items: [
        'General manager',
        'Sales engineer',
        'Project coordinator',
        'Field technician',
        'Storekeeper',
        'Purchasing officer',
        'Accountant',
        'HR',
        'Cashier',
      ],
    },
  },
};

export default nexEn;
