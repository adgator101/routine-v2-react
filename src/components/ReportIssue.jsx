import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Users, 
  Calendar,
  MapPin,
  BookOpen,
  UserX,
  Send,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createIssue, getMyIssues, ISSUE_TYPES } from '../services/issueServices';
import { useUserGroup } from '../context/UserGroupContext';
import { formatDate } from '../lib/dateUtils';

const ReportIssue = ({ onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { userGroup } = useUserGroup();

  const issueTypeOptions = [
    {
      value: ISSUE_TYPES.MISSING_ROUTINE,
      label: 'Missing Routine',
      description: 'A scheduled class is not showing in the routine',
      icon: Calendar,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      value: ISSUE_TYPES.MISSING_TEACHER,
      label: 'Missing Teacher',
      description: 'Teacher information is not available',
      icon: UserX,
      color: 'text-orange-600 bg-orange-50 border-orange-200'
    },
    {
      value: ISSUE_TYPES.INCORRECT_TIME,
      label: 'Incorrect Time',
      description: 'Class timing is wrong in the schedule',
      icon: Clock,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      value: ISSUE_TYPES.INCORRECT_ROOM,
      label: 'Incorrect Room',
      description: 'Room/location information is incorrect',
      icon: MapPin,
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      value: ISSUE_TYPES.INCORRECT_TEACHER,
      label: 'Incorrect Teacher',
      description: 'Wrong teacher assigned to the class',
      icon: User,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    {
      value: ISSUE_TYPES.OTHERS,
      label: 'Other Issue',
      description: 'Any other routine-related problem',
      icon: AlertTriangle,
      color: 'text-gray-600 bg-gray-50 border-gray-200'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!issueType || !description.trim()) {
      toast.error('Please select an issue type and provide a description');
      return;
    }

    try {
      setSubmitting(true);
      
      const issueData = {
        issueType,
        description: description.trim(),
        groupId: userGroup?.id || null
      };

      await createIssue(issueData);
      
      toast.success('Issue reported successfully! We\'ll look into it.');
      onClose();
    } catch (error) {
      console.error('Failed to create issue:', error);
      toast.error('Failed to report issue. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Report an Issue</h2>
            <p className="text-sm text-gray-600 mt-1">
              Help us improve by reporting problems with the routine
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* User Info Display */}
          {userGroup && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Reporting for: {userGroup.name}
                </span>
              </div>
            </div>
          )}

          {/* Issue Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What type of issue are you experiencing?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {issueTypeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setIssueType(option.value)}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      issueType === option.value
                        ? `${option.color} border-opacity-100`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        issueType === option.value ? '' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          issueType === option.value ? '' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          issueType === option.value ? 'opacity-80' : 'text-gray-500'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                      {issueType === option.value && (
                        <CheckCircle className="h-5 w-5 text-current" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the issue in detail
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide as much detail as possible about the issue you're experiencing..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Include specific details like class names, times, or teacher names if applicable
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!issueType || !description.trim() || submitting}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Report Issue
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component to show user's reported issues
const MyIssues = ({ onClose }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      setLoading(true);
      const data = await getMyIssues();
      setIssues(data || []);
    } catch (error) {
      console.error('Failed to fetch my issues:', error);
      toast.error('Failed to load your issues');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      OPEN: { label: 'Open', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      IN_PROGRESS: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      CLOSED: { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: X }
    };
    return configs[status] || configs.OPEN;
  };

  const getIssueTypeLabel = (type) => {
    const labels = {
      MISSING_ROUTINE: 'Missing Routine',
      MISSING_TEACHER: 'Missing Teacher',
      INCORRECT_TIME: 'Incorrect Time',
      INCORRECT_ROOM: 'Incorrect Room',
      INCORRECT_TEACHER: 'Incorrect Teacher',
      OTHERS: 'Other Issue'
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Reported Issues</h2>
            <p className="text-sm text-gray-600 mt-1">
              Track the status of issues you've reported
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : issues.length > 0 ? (
            <div className="space-y-4">
              {issues.map((issue) => {
                const statusConfig = getStatusConfig(issue.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={issue.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {getIssueTypeLabel(issue.issueType)}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {issue.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          Reported on {formatDate(issue.createdAt)}
                          {issue.updatedAt !== issue.createdAt && (
                            <span> • Updated {formatDate(issue.updatedAt)}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Issues Reported
              </h3>
              <p className="text-gray-500">
                You haven't reported any issues yet.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { ReportIssue, MyIssues };