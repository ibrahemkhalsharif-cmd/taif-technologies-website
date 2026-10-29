// Sector pages (English). Source: the company's notes on each sector (review, 29 Oct 2026),
// saved in docs/nex-erp-sector-notes.md. A natural rewrite, not a word-for-word translation.

const sectorsEn = {
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
          chips: [] as string[],
        },
        {
          title: 'Sales & site survey',
          points: [
            'The project’s location in the city, and details of the owner and the supervising engineer.',
            'Project details: number of floors and apartments, and floor heights.',
            'For elevators: overhead and pit, and the space available on the roof.',
            'Quotation requests from the sales rep, prepared later, then follow-up by customer status after the offer.',
          ],
          chips: [] as string[],
        },
        {
          title: 'Ordering & arrival',
          points: [
            'Order the elevator once the agreement is signed.',
            'Track each stage of its arrival, then store it when it arrives.',
            'The expected time for each stage.',
          ],
          chips: [] as string[],
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
          chips: [] as string[],
        },
        {
          title: 'Maintenance',
          points: [
            'Follow routine maintenance and monthly visits.',
            'Maintenance contracts.',
            'Quotations for the parts needed.',
          ],
          chips: [] as string[],
        },
        {
          title: 'HVAC',
          points: [
            'Apartment area and ceiling height.',
            'Dimensions of the rooms and living room.',
            'Groundwork requirements for piping and electrical, and excavation.',
          ],
          chips: [] as string[],
        },
      ],
      relatedLinks: [
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
          chips: [] as string[],
        },
        {
          title: 'Approvals & permits',
          points: [
            'Approval rights for adding work outside the tender, with the approvals documented.',
            'Pouring permits from concrete suppliers.',
            'Municipality and authority paperwork and requirements.',
          ],
          chips: [] as string[],
        },
        {
          title: 'Tests',
          points: ['Concrete tests for the project.', 'Soil and rock tests.', 'Building tests.'],
          chips: [] as string[],
        },
        {
          title: 'Site & resources',
          points: [
            'Site preparation and soil replacement.',
            'Project logistics, such as site offices.',
            'The project’s HR and finances, payments, and supply chain.',
          ],
          chips: [] as string[],
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
          chips: [] as string[],
        },
        {
          title: 'Property management',
          points: ['Manage properties and units.', 'Unit leasing, the occupancy board and leases.'],
          chips: [] as string[],
        },
        {
          title: 'Projects & construction',
          points: [
            'The full contracting system: tenders and pricing, phases, permits, tests and finishing.',
          ],
          chips: [] as string[],
        },
      ],
      relatedLinks: [
        { label: 'The contracting system', to: '/nex-erp/contracting' },
        { label: 'Real estate and the occupancy board', to: '/nex-erp#real-estate' },
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
};

export default sectorsEn;
export type SectorId = keyof typeof sectorsEn.items;
