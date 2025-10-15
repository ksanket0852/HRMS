import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createJob } from '@/services/jobService';
import { useNavigate } from 'react-router-dom';

const AdminJobCreatePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    department: '',
    type: 'Full-time',
    salary: '',
    status: 'Active',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob(formData);
      alert('Job created successfully!');
      navigate('/admin/jobs');
    } catch (error) {
      alert('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Job</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={5} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Input id="type" name="type" value={formData.type} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g., $80k - $120k" />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Job'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/jobs')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminJobCreatePage;
