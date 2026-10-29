// Sector pages (English). Source: the company's notes on each sector (review, 29 Oct 2026),
// saved in docs/nex-erp-sector-notes.md. A natural rewrite, not a word-for-word translation.

export type SectorId =
  'electromechanical' | 'contracting' | 'development' | 'elevators' | 'hvac' | 'solar';

export interface SectorGroup {
  title: string;
  points: string[];
  chips: string[];
  /** The chips are stages in order, shown with arrows between them */
  flow?: boolean;
}

export interface Sector {
  name: string;
  title: string;
  lead: string;
  groups: SectorGroup[];
  relatedLinks: { label: string; to: string }[];
}

export interface SurveyForm {
  tab: string;
  name: string;
  note: string;
  sections: string[];
}

export interface Sectors {
  eyebrow: string;
  back: string;
  details: string;
  related: string;
  items: Record<SectorId, Sector>;
  leads: { title: string; lead: string; stages: string[] };
  surveys: { title: string; lead: string; forms: SurveyForm[] };
}

const sectorsEn: Sectors = {
  eyebrow: 'NEX ERP for your sector',
  back: 'All of NEX ERP',
  details: 'Sector details',
  related: 'Read next',
  items: {
    electromechanical: {
      name: 'Elevators, HVAC and solar',
      title: 'From the site survey to routine maintenance.',
      lead: 'NEX ERP follows elevator, HVAC and solar projects step by step: supply and stock, site surveys and pricing, ordering and arrival, installation in phases, permits, then maintenance.',
      groups: [
        {
          title: 'Supply & inventory',
          points: [
            'Supply chains and device types.',
            'Inventory and warehouse control.',
            'The types and names of the parts each device needs.',
          ],
          chips: [],
        },
        {
          title: 'Sales & site survey',
          points: [
            'The project’s location in the city, and details of the owner and the supervising engineer.',
            'Project details: number of floors and apartments, and floor heights.',
            'For elevators: overhead and pit, and the space available on the roof.',
            'Quotation requests from the sales rep, prepared later, then follow-up by customer status after the offer.',
          ],
          chips: [],
        },
        {
          title: 'Ordering & arrival',
          points: [
            'Order the elevator once the agreement is signed.',
            'Track each stage of its arrival, then store it when it arrives.',
            'The expected time for each stage.',
          ],
          chips: [],
        },
        {
          title: 'Installation in phases',
          points: [
            'Civil works required from the owner, or from the contractor when the installing company also does them.',
            'Installation stages from rails and doors through to commissioning, with the company’s own commissioning tests.',
            'Finishing works the owner needs to do around the doors after installation.',
          ],
          chips: [
            'Civil works',
            'Rails',
            'Doors',
            'Commissioning',
            'Commissioning tests',
            'Finishing',
          ],
        },
        {
          title: 'Permits & handover',
          points: [
            'Request the operating permit from the authorities: standards and metrology, and civil defence.',
            'Insure the elevator.',
            'Hand the elevator over to the maintenance department after commissioning.',
          ],
          chips: [],
        },
        {
          title: 'Maintenance',
          points: [
            'Follow routine maintenance and monthly visits.',
            'Maintenance contracts.',
            'Quotations for the parts needed.',
          ],
          chips: [],
        },
        {
          title: 'HVAC',
          points: [
            'Apartment area and ceiling height.',
            'Dimensions of the rooms and living room.',
            'Groundwork requirements for piping and electrical, and excavation.',
          ],
          chips: [],
        },
      ],
      relatedLinks: [
        { label: 'HVAC companies', to: '/nex-erp/hvac' },
        { label: 'Solar energy companies', to: '/nex-erp/solar' },
        { label: 'Maintenance contracts and tickets', to: '/nex-erp#operations' },
        { label: 'Contracting companies', to: '/nex-erp/contracting' },
      ],
    },

    contracting: {
      name: 'Contracting companies',
      title: 'From the tender to the finishing.',
      lead: 'NEX ERP runs contracting projects from inviting and pricing tenders, through phases, permits and tests, to following up the finishing works.',
      groups: [
        {
          title: 'Tenders & pricing',
          points: [
            'Inviting tenders.',
            'Pricing tenders and projects on changing raw-material prices, such as steel and cement.',
            'A pricing base for each project type.',
            'Specifications of raw and finishing materials, with their shapes, sizes and prices.',
          ],
          chips: ['Building', 'Roads and paving', 'Finishing', 'Repair', 'Infrastructure'],
        },
        {
          title: 'Planning & agreements',
          points: [
            'Store the project’s drawings.',
            'A completion plan for each phase and its duration, and project management charts.',
            'The project’s agreements.',
            'Project details: land area, built area and number of floors for construction projects.',
          ],
          chips: [],
        },
        {
          title: 'Approvals & permits',
          points: [
            'Approval rights for adding work outside the tender, with the approvals documented.',
            'Pouring permits from concrete suppliers.',
            'Municipality and authority paperwork and requirements.',
          ],
          chips: [],
        },
        {
          title: 'Tests',
          points: ['Concrete tests for the project.', 'Soil and rock tests.', 'Building tests.'],
          chips: [],
        },
        {
          title: 'Site & resources',
          points: [
            'Site preparation and soil replacement.',
            'Project logistics, such as site offices.',
            'The project’s HR and finances, payments, and supply chain.',
          ],
          chips: [],
        },
        {
          title: 'Finishing follow-up',
          points: ['Follow the finishing phase item by item.'],
          chips: [
            'Plaster',
            'Tiles',
            'Electrical',
            'Water',
            'Drainage',
            'Paint',
            'Aluminium',
            'Doors',
          ],
        },
      ],
      relatedLinks: [
        { label: 'Real estate development companies', to: '/nex-erp/development' },
        { label: 'Profit and loss per project', to: '/nex-erp#operations' },
      ],
    },

    development: {
      name: 'Real estate development companies',
      title: 'From the opportunity to the sale, and managing the properties.',
      lead: 'Everything in the contracting system, plus property management, comparing investment opportunities and their feasibility, and following buyers through to the sale.',
      groups: [
        {
          title: 'Investment opportunities & feasibility',
          points: [
            'Compare and weigh investment opportunities.',
            'Feasibility by land price and location.',
            'Building ratio and the number of floors allowed.',
            'Land classification and use.',
          ],
          chips: ['A', 'B', 'C', 'Residential', 'Commercial & residential', 'Commercial & offices'],
        },
        {
          title: 'Buyer follow-up & sales',
          points: [
            'Follow up buyers through to the sale.',
            'Classify each lead by how the call went, from the first contact to a sale or a loss.',
          ],
          chips: [],
        },
        {
          title: 'Property management',
          points: ['Manage properties and units.', 'Unit leasing, the occupancy board and leases.'],
          chips: [],
        },
        {
          title: 'Projects & construction',
          points: [
            'The full contracting system: tenders and pricing, phases, permits, tests and finishing.',
          ],
          chips: [],
        },
      ],
      relatedLinks: [
        { label: 'The contracting system', to: '/nex-erp/contracting' },
        { label: 'Real estate and the occupancy board', to: '/nex-erp#real-estate' },
      ],
    },

    // Elevators: the company's notes (the electromechanical page) plus the elevator example in docs/nex-erp-brief.md
    elevators: {
      name: 'Elevator companies',
      title: 'From the site survey to routine maintenance.',
      lead: 'NEX ERP follows elevator and escalator projects step by step: supply and stock, site surveys and pricing, ordering and importing, installation in phases, permits and certificates, then maintenance.',
      groups: [
        {
          title: 'Supply & inventory',
          points: [
            'Supply chains and device types.',
            'Inventory and warehouse control.',
            'The types and names of the parts each device needs.',
          ],
          chips: [],
        },
        {
          title: 'Sales & site survey',
          points: [
            'The project’s location in the city, and details of the owner and the supervising engineer.',
            'Project details: number of floors and apartments, and floor heights.',
            'For elevators: overhead and pit, and the space available on the roof.',
            'A site survey visit with a checklist.',
            'Quotation requests from the sales rep, prepared later, then follow-up by customer status after the offer.',
          ],
          chips: [],
        },
        {
          title: 'Quotation & contract',
          points: [
            'A supply-and-installation quotation with milestone payments, such as 30% / 40% / 30%, and revenue recognised over time.',
            'The general manager approves the quotation.',
            'Activating the contract creates the project, the sales order and the jobs for each phase automatically.',
          ],
          chips: ['Lead', 'Site survey', 'Quotation', 'Manager approval', 'Contract', 'Activation'],
          flow: true,
        },
        {
          title: 'Ordering & arrival',
          points: [
            'Order the elevator once the agreement is signed.',
            'A purchase order to the manufacturer in its currency, such as euros, then follow the international shipment.',
            'Track each stage of its arrival, then store it when it arrives.',
            'Receive it by serial number, with freight and customs added to the elevator’s cost.',
            'The expected time for each stage.',
          ],
          chips: [],
        },
        {
          title: 'Installation in phases',
          points: [
            'Civil works required from the owner, or from the contractor when the installing company also does them.',
            'Installation stages from rails and doors through to commissioning, with the company’s own commissioning tests.',
            'Parts issued from stock to the contract’s project, so their cost shows in its profit.',
            'The elevator safety checklist.',
            'Finishing works the owner needs to do around the doors after installation.',
          ],
          chips: [
            'Civil works',
            'Rails',
            'Doors',
            'Commissioning',
            'Commissioning tests',
            'Finishing',
          ],
          flow: true,
        },
        {
          title: 'Permits, certificates & handover',
          points: [
            'Request the operating permit from the authorities: standards and metrology, and civil defence.',
            'Insure the elevator.',
            'Certificates with their expiry dates, and an automatic reminder before renewal.',
            'Hand the elevator over to the maintenance department after commissioning.',
          ],
          chips: ['Civil defence', 'Periodic inspection', 'Insurance', 'Guarantee'],
        },
        {
          title: 'Maintenance',
          points: [
            'Follow routine maintenance and monthly visits.',
            'Maintenance contracts.',
            'Fault tickets by priority, such as a stuck elevator or a door that won’t close.',
            'Spare parts covered by the maintenance contract, or billed to the customer.',
            'Quotations for the parts needed.',
          ],
          chips: [],
        },
      ],
      relatedLinks: [
        { label: 'HVAC companies', to: '/nex-erp/hvac' },
        { label: 'Solar energy companies', to: '/nex-erp/solar' },
        { label: 'Elevators, HVAC and solar', to: '/nex-erp/electromechanical' },
        { label: 'Maintenance contracts and tickets', to: '/nex-erp#operations' },
      ],
    },

    // HVAC and solar: the company's page outlines (review, 29 Oct 2026)
    hvac: {
      name: 'HVAC companies',
      title: 'Run your company from the site survey to maintenance, in one system.',
      lead: 'From the first enquiry to the survey, the quotation, installation and maintenance contracts: all of an HVAC company’s work in one system, in the office and on site.',
      groups: [
        {
          title: 'Customers & leads (CRM)',
          points: [
            'Log every enquiry with its source: a call, WhatsApp, the website or an exhibition.',
            'Follow each sale from the enquiry to the contract.',
            'Automatic follow-up reminders, so no customer slips through.',
            'A full record for each customer: their sites, units, contracts and payments.',
          ],
          chips: ['Enquiry', 'Site survey', 'Quotation', 'Negotiation', 'Contract'],
          flow: true,
        },
        {
          title: 'Site surveys & technical calculations',
          points: [
            'Ready survey forms for split and central air conditioning, filled in on a phone on site.',
            'Project details: its location in the city, the owner, the supervising engineer, and the number of floors and apartments.',
            'Apartment area and ceiling height, and the dimensions of the rooms and living room.',
            'Upload photos, drawings and measurements straight from the site.',
            'Calculate the heat load of each room and estimate the right capacity.',
            'Suggest system types (Split / Ducted / VRF), with the reasons shown to the customer.',
          ],
          chips: [],
        },
        {
          title: 'Quotations & contracts',
          points: [
            'Professional quotations on templates with the company’s logo, with several options: economy, balanced and complete.',
            'An item library linked to prices, costs and profit margins.',
            'Track each quotation: sent, opened, accepted or rejected.',
            'Turn an accepted quotation into a contract and a project in one click.',
          ],
          chips: [],
        },
        {
          title: 'Projects & installation',
          points: [
            'Follow the installation stages from rough-in to handover.',
            'Schedule technicians and teams, and assign tasks.',
            'Track progress and delayed projects.',
            'Daily site reports with photos.',
            'Groundwork requirements for piping and electrical, and excavation.',
            'Gas charging and a test run, with a checklist and the customer’s sign-off.',
          ],
          chips: [
            'Rough-in',
            'Pressure test',
            'Insulation',
            'Installation',
            'Commissioning',
            'Handover',
          ],
          flow: true,
        },
        {
          title: 'Warehouses & purchasing',
          points: [
            'Supply chains and device types, and the parts each device needs.',
            'Stock of units, copper parts, refrigerant gas and consumables.',
            'Buy imported units in the supplier’s currency, such as dollars.',
            'Track the serial number of every indoor and outdoor unit, which matters for warranties.',
            'Low-stock alerts and automatic purchase requests.',
            'Compare supplier prices and manage payables.',
            'Issue materials to the project and calculate their actual cost.',
          ],
          chips: [],
        },
        {
          title: 'Maintenance & service contracts',
          points: [
            'Periodic maintenance contracts with automatic visit reminders.',
            'Preventive visits for filter cleaning and pressure checks.',
            'Periodic billing for all maintenance contracts in one run.',
            'Parts the contract doesn’t cover are billed to the customer.',
            'Fault requests, assigned to technicians.',
            'A maintenance history for each unit: installation date, faults and replaced parts.',
            'Warranty management: what it covers and what has expired.',
            'A customer rating after every visit.',
          ],
          chips: [],
        },
        {
          title: 'Accounting & finance',
          points: [
            'Invoices, receipts and payments, with staged payments by project phase.',
            'Customer and supplier balances, with their ageing.',
            'Profit for each project: planned against actual.',
            'VAT and financial reports.',
          ],
          chips: [],
        },
        {
          title: 'HR & technicians',
          points: [
            'Attendance, and tracking where technicians are.',
            'Wages and commissions for sales staff and technicians.',
            'Advances, deductions and entitlements.',
          ],
          chips: [],
        },
        {
          title: 'Reports & dashboards',
          points: [
            'Team sales, and how many quotations become contracts.',
            'Profit by project and by item.',
            'Technician performance, and how fast requests are closed.',
            'A manager’s dashboard that shows everything on one screen.',
          ],
          chips: [],
        },
        {
          title: 'Customer portal & mobile app',
          points: [
            'Customers follow their project, request maintenance and download their invoices.',
            'An app for technicians to work on site without paper.',
          ],
          chips: [],
        },
      ],
      relatedLinks: [
        { label: 'Solar energy companies', to: '/nex-erp/solar' },
        { label: 'Elevators, HVAC and solar', to: '/nex-erp/electromechanical' },
      ],
    },

    solar: {
      name: 'Solar energy companies',
      title: 'From the feasibility study to production monitoring, on one platform.',
      lead: 'NEX ERP follows a solar project from the first enquiry, the site study and the feasibility study, through permits and installation, to monitoring and maintaining the system after handover.',
      groups: [
        {
          title: 'Customers & opportunities',
          points: [
            'Log enquiries and classify them by project type.',
            'Sales stages, with an estimate of each deal’s size.',
            'Automatic follow-up and ready-made WhatsApp messages.',
          ],
          chips: ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
        },
        {
          title: 'Site study & initial design',
          points: [
            'A roof survey form: shading, orientation and tilt.',
            'Upload photos of the roof and the electrical drawing.',
            'A load calculator, and analysis of the last 12 months of electricity bills.',
            'Size the system (kWp), the inverter and the batteries.',
            'Estimate monthly and yearly production (kWh).',
            'Choose the system type.',
          ],
          chips: ['On-Grid', 'Hybrid', 'Off-Grid'],
        },
        {
          title: 'Financial feasibility for the customer',
          points: [
            'Monthly savings and the payback period.',
            'Return on investment (ROI) over 25 years.',
            'Compare the options: economy, balanced and complete.',
            'A ready PDF report with the company’s logo, to hand to the customer.',
          ],
          chips: [],
        },
        {
          title: 'Quotations & contracts',
          points: [
            'Quotations linked to a library of panels, inverters, batteries, mounting structures and cables.',
            'Specifications and warranty periods for each item.',
            'Contract templates and payment schedules.',
            'Track each quotation, and the acceptance rate.',
          ],
          chips: [],
        },
        {
          title: 'Permits & approvals',
          points: [
            'Follow the approvals from the electricity company and the authorities, stage by stage.',
            'Lists of the documents required at each stage.',
            'Alerts for deadlines and missing documents.',
            'Official files kept with each project.',
          ],
          chips: [],
        },
        {
          title: 'Installation',
          points: [
            'Follow the installation stages from supply to commissioning.',
            'Schedule teams and equipment.',
            'Safety checklists for working at height.',
            'Daily photo reports, and progress.',
            'A handover report signed by the customer.',
          ],
          chips: [
            'Supply',
            'Roof preparation',
            'Mounting structures',
            'Panels',
            'Electrical works',
            'Grid connection',
            'Commissioning',
          ],
          flow: true,
        },
        {
          title: 'Warehouses & purchasing',
          points: [
            'Track the serial numbers of panels, inverters and batteries.',
            'Manage shipments, imports and customs, and their costs.',
            'Stock of mounting structures, cables and accessories.',
            'The project’s actual cost against the estimate.',
          ],
          chips: [],
        },
        {
          title: 'Monitoring after handover (O&M)',
          points: [
            'Connect to inverter monitoring platforms and show each system’s production.',
            'Alerts when production drops or a fault occurs.',
            'Scheduled maintenance and panel-cleaning contracts.',
            'A log of faults and warranties, with warranty claims to the manufacturer.',
            'Periodic performance reports for the customer.',
          ],
          chips: [],
        },
        {
          title: 'Accounting & finance',
          points: [
            'Staged payments by progress.',
            'Profit and deal margin for each project.',
            'Balances, invoices and tax.',
            'Currencies and import exchange differences, where needed.',
          ],
          chips: [],
        },
        {
          title: 'Reports',
          points: [
            'Total installed capacity (MWp) and the number of projects.',
            'Project profits and sales performance.',
            'Delayed projects, and projects behind on payments.',
            'An executive dashboard.',
          ],
          chips: [],
        },
        {
          title: 'Customer portal',
          points: [
            'Customers follow their project’s progress, then their system’s production.',
            'They download invoices, warranties and certificates.',
            'They request maintenance and see its history.',
          ],
          chips: [],
        },
      ],
      relatedLinks: [
        { label: 'HVAC companies', to: '/nex-erp/hvac' },
        { label: 'Elevators, HVAC and solar', to: '/nex-erp/electromechanical' },
      ],
    },
  },

  // Lead stages for real estate sales (development page)
  leads: {
    title: 'Lead stages',
    lead: 'Every call updates the lead’s status, so the sales team knows who needs follow-up and when.',
    stages: [
      'No answer',
      'Call back',
      'Appointment set',
      'Just curious',
      'Visited the projects',
      'Negotiating',
      'Sold',
      'Lost',
    ],
  },

  // The company's two site survey forms (HVAC page); section titles only
  surveys: {
    title: 'The site survey forms',
    lead: 'Two ready forms the technician or engineer fills in during the visit, then signs with the customer.',
    forms: [
      {
        tab: 'Split AC',
        name: 'Split air conditioning',
        note: 'Filled in by the technician during the visit, room by room.',
        sections: [
          'Project details',
          'Spaces (one table per room)',
          'Indoor unit',
          'Outdoor unit',
          'Piping and drainage route',
          'Electrical',
          'Ventilation and fresh air',
          'Coordination with other works',
          'Options for the customer',
          'Notes and risks',
          'Survey sign-off',
        ],
      },
      {
        tab: 'Central AC',
        name: 'Central air conditioning (Ducted / VRF / Chiller)',
        note: 'Filled in by the technician and the engineer during the visit.',
        sections: [
          'Project details',
          'Building data and heat loads',
          'Choosing the system',
          'False ceilings and duct routes',
          'Outdoor unit and plant room',
          'Piping and drainage',
          'Electrical and controls',
          'Coordination with other works',
          'Commissioning and final testing',
          'Quotation and options',
          'Notes and risks',
          'Survey sign-off',
        ],
      },
    ],
  },
};

export default sectorsEn;
