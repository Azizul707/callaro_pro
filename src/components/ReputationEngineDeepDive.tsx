import React from 'react';

export const ReputationEngineDeepDive: React.FC = () => {
  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-base" id="reputation-engine">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-secondary uppercase tracking-wider mb-2 block font-semibold">
            Automated Reputation Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Turn Happy Customers Into More Customers
          </h2>
          <p className="text-base text-text-muted">
            Generate constant 5-star Google reviews and local social proof without writing a single line of copy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Automated 5-Star Review Engine */}
          <div className="p-8 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30">
                  <span className="material-symbols-outlined">grade</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Automated 5-Star Review Engine</h3>
                  <span className="text-xs font-code text-secondary font-semibold">$50/month</span>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                After every completed job, customers receive a friendly text asking for a review. More reviews mean higher local rankings, more trust, and free leads from Google.
              </p>
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs font-code text-text-muted">
                <div className="flex items-center gap-2 text-status-positive font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span> Sample Review SMS
                </div>
                <p className="italic text-text-primary">
                  &quot;Hi Sarah, thanks for choosing Apex Plumbing today! If you're happy with the repair, would you mind leaving us a quick 5-star review? It helps our local team immensely: [Google Link]&quot;
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code">
              <span className="text-text-dim">Sent automatically upon job completion</span>
              <span className="text-status-positive font-bold">+15 Reviews/mo</span>
            </div>
          </div>

          {/* Feature 2: Zero-Effort Social Media Poster */}
          <div className="p-8 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary border border-primary/30">
                  <span className="material-symbols-outlined">add_a_photo</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Zero-Effort Social Media Poster</h3>
                  <span className="text-xs font-code text-primary font-semibold">$50/month</span>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Finished a job? Just text a Before &amp; After photo to our dedicated WhatsApp number. Our AI creates professional captions with local hashtags and publishes the post to your Facebook/Instagram automatically while you drive to the next job.
              </p>
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs font-code text-text-muted">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">bolt</span> Automated Meta Post Pipeline
                </div>
                <p className="text-text-primary">
                  Photo texted via WhatsApp ➔ AI crafts high-engagement copy ➔ Tags neighborhood &amp; service ➔ Auto-published to Meta within 90 seconds.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code">
              <span className="text-text-dim">Zero manual drafting or logins</span>
              <span className="text-primary font-bold">Always Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReputationEngineDeepDive;
