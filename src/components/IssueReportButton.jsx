import React, { useState } from 'react';
import { AlertTriangle, Flag } from 'lucide-react';
import { ReportIssue, MyIssues } from './ReportIssue';

const IssueReportButton = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMyIssuesModal, setShowMyIssuesModal] = useState(false);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        {/* Report Issue Button */}
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          title="Report an Issue"
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="hidden sm:inline">Report Issue</span>
        </button>

        {/* My Issues Button */}
        <button
          onClick={() => setShowMyIssuesModal(true)}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          title="My Issues"
        >
          <Flag className="h-5 w-5" />
          <span className="hidden sm:inline">My Issues</span>
        </button>
      </div>

      {/* Modals */}
      {showReportModal && (
        <ReportIssue onClose={() => setShowReportModal(false)} />
      )}
      
      {showMyIssuesModal && (
        <MyIssues onClose={() => setShowMyIssuesModal(false)} />
      )}
    </>
  );
};

export default IssueReportButton;