const getDashboardMetrics = async (req, res) => {
  try {
    // In a real application, you would query the database here.
    // We are generating realistic mock data for the dashboard.
    
    const kpiCards = {
      totalClients: 50,
      totalManagers: 20,
      totalStaff: 100, // Recruiters/Staff
      totalCandidates: 2500,
      openPositions: 342,
      closedPositions: 158,
      pendingApproval: 45,
      todaysInterviews: 32,
      offersReleased: 200,
      joinedCandidates: 180
    };

    const monthlyHiring = [
      { name: 'Jan', hired: 45, target: 50 },
      { name: 'Feb', hired: 52, target: 50 },
      { name: 'Mar', hired: 38, target: 60 },
      { name: 'Apr', hired: 65, target: 60 },
      { name: 'May', hired: 48, target: 65 },
      { name: 'Jun', hired: 70, target: 65 },
      { name: 'Jul', hired: 25, target: 70 } // Current month
    ];

    const clientWiseHiring = [
      { name: 'TCS', value: 35 },
      { name: 'Infosys', value: 28 },
      { name: 'Wipro', value: 22 },
      { name: 'Accenture', value: 45 },
      { name: 'Google', value: 15 },
      { name: 'Others', value: 35 }
    ];

    const recruiterPerformance = [
      { name: 'Ravi S.', sourced: 120, interviewed: 45, hired: 12 },
      { name: 'Priya K.', sourced: 95, interviewed: 38, hired: 15 },
      { name: 'Amit P.', sourced: 150, interviewed: 60, hired: 18 },
      { name: 'Sneha R.', sourced: 80, interviewed: 30, hired: 8 },
      { name: 'Karan M.', sourced: 110, interviewed: 42, hired: 10 }
    ];

    const recruitmentPipeline = [
      { name: 'Sourced', count: 2500 },
      { name: 'Screening', count: 850 },
      { name: 'Shortlisted', count: 420 },
      { name: 'Interviewing', count: 280 },
      { name: 'Offered', count: 200 },
      { name: 'Joined', count: 180 }
    ];

    const tatPerformance = [
      { name: 'Engineering', avgDays: 45 },
      { name: 'Sales', avgDays: 22 },
      { name: 'Marketing', avgDays: 30 },
      { name: 'HR', avgDays: 18 },
      { name: 'Finance', avgDays: 28 }
    ];

    res.status(200).json({
      success: true,
      data: {
        kpiCards,
        charts: {
          monthlyHiring,
          clientWiseHiring,
          recruiterPerformance,
          recruitmentPipeline,
          tatPerformance
        }
      }
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ success: false, message: 'Server Error Fetching Dashboard' });
  }
};

module.exports = {
  getDashboardMetrics
};
