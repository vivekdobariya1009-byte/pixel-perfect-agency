import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Mail, 
  Settings, 
  Inbox,
  Trash2,
  Eye,
  Loader2,
  Save,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { User, Session } from '@supabase/supabase-js';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface SmtpSettings {
  id?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings>({
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    from_email: '',
    from_name: 'Shunyek Infotech',
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate('/admin/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/admin/auth');
      } else {
        // Check admin role
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive',
      });
      navigate('/admin/auth');
      return;
    }

    setIsLoading(false);
    fetchInquiries();
    fetchSmtpSettings();
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      return;
    }

    setInquiries(data || []);
  };

  const fetchSmtpSettings = async () => {
    const { data } = await supabase
      .from('smtp_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data) {
      setSmtpSettings(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Status updated' });
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete inquiry',
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Inquiry deleted' });
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  const saveSmtpSettings = async () => {
    setIsSaving(true);

    try {
      if (smtpSettings.id) {
        const { error } = await supabase
          .from('smtp_settings')
          .update({
            host: smtpSettings.host,
            port: smtpSettings.port,
            username: smtpSettings.username,
            password: smtpSettings.password,
            from_email: smtpSettings.from_email,
            from_name: smtpSettings.from_name,
          })
          .eq('id', smtpSettings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('smtp_settings')
          .insert({
            host: smtpSettings.host,
            port: smtpSettings.port,
            username: smtpSettings.username,
            password: smtpSettings.password,
            from_email: smtpSettings.from_email,
            from_name: smtpSettings.from_name,
          });

        if (error) throw error;
      }

      toast({
        title: 'Settings saved',
        description: 'SMTP settings have been saved successfully.',
      });
      fetchSmtpSettings();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <Inbox className="w-5 h-5" />
                Inquiries
                {inquiries.filter(i => i.status === 'pending').length > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                    {inquiries.filter(i => i.status === 'pending').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <Settings className="w-5 h-5" />
                SMTP Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'inquiries' ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Inquiries List */}
                <div className="bg-card rounded-3xl border border-border/50 shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-border/50">
                    <h2 className="text-xl font-semibold">Inquiries</h2>
                    <p className="text-sm text-muted-foreground">
                      {inquiries.length} total inquiries
                    </p>
                  </div>
                  
                  <div className="max-h-[600px] overflow-y-auto">
                    {inquiries.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        No inquiries yet
                      </div>
                    ) : (
                      inquiries.map((inquiry) => (
                        <motion.button
                          key={inquiry.id}
                          onClick={() => setSelectedInquiry(inquiry)}
                          className={`w-full p-4 text-left border-b border-border/30 hover:bg-secondary/50 transition-colors ${
                            selectedInquiry?.id === inquiry.id ? 'bg-secondary' : ''
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(inquiry.status)}
                                <span className="font-medium truncate">{inquiry.name}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{inquiry.email}</p>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {inquiry.message}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </motion.button>
                      ))
                    )}
                  </div>
                </div>

                {/* Inquiry Detail */}
                <div className="bg-card rounded-3xl border border-border/50 shadow-lg overflow-hidden">
                  {selectedInquiry ? (
                    <>
                      <div className="p-6 border-b border-border/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-semibold">{selectedInquiry.name}</h2>
                            <p className="text-sm text-muted-foreground">{selectedInquiry.email}</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteInquiry(selectedInquiry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <p className="font-medium">{selectedInquiry.phone}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Message</label>
                          <p className="mt-1 whitespace-pre-wrap">{selectedInquiry.message}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Status</label>
                          <div className="flex gap-2 mt-2">
                            {['pending', 'resolved', 'rejected'].map((status) => (
                              <Button
                                key={status}
                                variant={selectedInquiry.status === status ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateInquiryStatus(selectedInquiry.id, status)}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                          <p>{new Date(selectedInquiry.created_at).toLocaleString()}</p>
                        </div>
                        
                        <Button
                          variant="hero"
                          className="w-full"
                          onClick={() => window.open(`mailto:${selectedInquiry.email}`)}
                        >
                          <Mail className="w-4 h-4" />
                          Reply via Email
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground h-full flex items-center justify-center">
                      <div>
                        <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select an inquiry to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-3xl border border-border/50 shadow-lg p-8 max-w-2xl"
              >
                <h2 className="text-xl font-semibold mb-6">SMTP Settings</h2>
                <p className="text-muted-foreground mb-6">
                  Configure Google SMTP to receive email notifications for new inquiries.
                </p>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">SMTP Host</label>
                      <Input
                        value={smtpSettings.host}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Port</label>
                      <Input
                        type="number"
                        value={smtpSettings.port}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                        placeholder="587"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Gmail Username (Email)</label>
                    <Input
                      value={smtpSettings.username}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">App Password</label>
                    <Input
                      type="password"
                      value={smtpSettings.password}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                      placeholder="Your Gmail App Password"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use a Google App Password, not your regular password. 
                      <a 
                        href="https://support.google.com/accounts/answer/185833" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        Learn how to create one
                      </a>
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">From Email</label>
                      <Input
                        value={smtpSettings.from_email}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, from_email: e.target.value })}
                        placeholder="noreply@shunyekinfotech.in"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">From Name</label>
                      <Input
                        value={smtpSettings.from_name}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, from_name: e.target.value })}
                        placeholder="Shunyek Infotech"
                      />
                    </div>
                  </div>
                  
                  <Button
                    variant="hero"
                    onClick={saveSmtpSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;