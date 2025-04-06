
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';
import AnimatedText from '@/components/ui/animated-text';
import ParallaxSection from '@/components/ui/parallax-section';
import { 
  Shield, ExternalLink, CheckCircle, Clock, ArrowRight,
  Search, Filter
} from 'lucide-react';

// Mock donation transaction data
const transactions = [
  {
    id: "TR-87652",
    from: "Anonymous User",
    to: "Clean Ocean Initiative",
    amount: "$950",
    timestamp: "2023-11-27 14:32:45",
    status: "completed",
    method: "Credit Card"
  },
  {
    id: "TR-87643",
    from: "Anonymous User",
    to: "Education for All",
    amount: "$100",
    timestamp: "2023-11-27 12:18:22",
    status: "completed",
    method: "PayPal"
  },
  {
    id: "TR-87621",
    from: "Anonymous User",
    to: "Hunger Relief Network",
    amount: "$475",
    timestamp: "2023-11-27 09:45:11",
    status: "pending",
    method: "Bank Transfer"
  }
];

const TransparencySection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  return (
    <section className="py-20 px-6 md:px-10 bg-secondary/30 dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
          <div className="lg:max-w-xl mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-impact-blue/10 p-2 rounded-full">
                <Shield className="w-5 h-5 text-impact-blue" />
              </div>
              <span className="text-sm font-medium">Complete Transparency</span>
            </div>
            
            <AnimatedText
              text="Transparent Donations"
              className="text-3xl md:text-4xl font-bold mb-4"
              animationType="slide"
              duration={800}
            />
            
            <ParallaxSection speed={0.15} direction="up">
              <p className="text-muted-foreground text-lg">
                Every donation on AidQuest is tracked and verified, creating a reliable record of impact. 
                Follow how your contribution makes a difference from start to finish.
              </p>
            </ParallaxSection>
          </div>
          
          <ParallaxSection speed={-0.1} direction="down">
            <div className="glass-card p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white dark:bg-black/40 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110">
                  <CheckCircle className="w-6 h-6 text-impact-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$1.2M+</p>
                  <p className="text-sm text-muted-foreground">Verified donations</p>
                </div>
              </div>
              
              <div className="h-10 w-px bg-border hidden sm:block"></div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white dark:bg-black/40 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110">
                  <Clock className="w-6 h-6 text-impact-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-muted-foreground">Traceable funds</p>
                </div>
              </div>
            </div>
          </ParallaxSection>
        </div>
        
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <Button 
                variant={activeTab === "all" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("all")}
                className={`transition-all duration-300 ${activeTab === "all" ? "bg-primary" : ""} hover:scale-105`}
              >
                All Transactions
              </Button>
              <Button 
                variant={activeTab === "recent" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("recent")}
                className={`transition-all duration-300 ${activeTab === "recent" ? "bg-primary" : ""} hover:scale-105`}
              >
                Recent
              </Button>
              <Button 
                variant={activeTab === "my" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("my")}
                className={`transition-all duration-300 ${activeTab === "my" ? "bg-primary" : ""} hover:scale-105`}
              >
                My Donations
              </Button>
            </div>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64 transition-all duration-300 hover:shadow-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="glass-input w-full pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
              </div>
              <Button variant="outline" size="icon" className="transition-all duration-300 hover:bg-primary/10 hover:border-primary">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Transaction ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">From</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">To</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Time</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    className={`border-b border-border transition-colors duration-300 ${
                      hoveredRow === tx.id ? 'bg-primary/5' : 'hover:bg-muted/30'
                    }`}
                    onMouseEnter={() => setHoveredRow(tx.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{tx.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">{tx.from}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium">{tx.to}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div>{tx.amount}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        tx.status === "completed" 
                          ? "bg-impact-green/10 text-impact-green" 
                          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          tx.status === "completed" 
                            ? "bg-impact-green" 
                            : "bg-amber-500"
                        }`}></div>
                        {tx.status === "completed" ? "Completed" : "Pending"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-muted-foreground">
                        {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-muted-foreground">
                        {tx.method}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-border flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Showing 3 of 2,845 transactions</span>
            <MagneticButton variant="outline" size="sm" strength={30}>
              View All Transactions
              <ArrowRight size={14} className="ml-2" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
