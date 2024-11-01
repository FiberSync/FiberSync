const purchaseMail = {
    from: 'fibersync.textile@gmail.com',
    to: `${email}`,
    subject: 'Subscription Confirmed: Welcome to FiberSync Textile SCM!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://i.ibb.co/fvdtMCx/fiber-Logo.png" alt="FiberSync Logo" style="max-width: 200px; height: auto;">
        </div>
  
        <!-- Welcome Message -->
        <h1 style="text-align: center; color: #191919;">Welcome, ${orgName}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Dear ${orgName} Team,
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Thank you for choosing <strong>FiberSync</strong> to manage and enhance your textile supply chain. We’re thrilled to welcome your organization to our platform, and we’re confident our tools will provide the efficiency, traceability, and transparency you need to excel in the textile industry.
        </p>
        
        <!-- Subscription Details -->
        <h2 style="color: #191919; font-size: 20px; margin-top: 20px;">Your Subscription Details</h2>
        <ul style="font-size: 16px; line-height: 1.6; color: #555;">
          <li><strong>Organization Name:</strong> ${orgName}</li>
          <li><strong>Selected Plan:</strong> ${plan}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
  
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          As a valued subscriber, you now have full access to FiberSync’s suite of SCM tools designed specifically for the textile industry. From real-time data management to enhanced traceability, our platform is here to support your success.
        </p>
  
        <!-- Key Benefits -->
        <h2 style="color: #191919; font-size: 20px; margin-top: 20px;">Here’s What You Can Expect:</h2>
        <ul style="font-size: 16px; line-height: 1.6; color: #555;">
          <li><strong>Real-time Monitoring:</strong> Track every step, from spinning and weaving to dyeing and distribution, with comprehensive, real-time data at your fingertips.</li>
          <li><strong>Blockchain Traceability:</strong> Ensure secure, transparent records across your supply chain, enhancing trust and credibility for your business.</li>
          <li><strong>Data Security:</strong> Protect your operations and secure sensitive supply chain data with our blockchain-based platform.</li>
          <li><strong>Tailored Support:</strong> Get assistance anytime with FiberSync’s dedicated support team for all subscription plans.</li>
        </ul>
  
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Whether you’re managing a small or medium enterprise, FiberSync is committed to driving operational excellence for your team. We're here to help you leverage SCM to grow your business.
        </p>
  
        <!-- Access Platform Button -->
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://fibersync-portfolio.vercel.app" target="_blank" style="background-color: #39ff14; color: #191919; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-size: 18px; font-weight: bold; display: inline-block;">
            Access Your Dashboard
          </a>
        </div>
  
        <!-- Footer -->
        <div style="margin-top: 40px; text-align: center; font-size: 14px; color: #777;">
          <p>Thank you for trusting FiberSync as your supply chain partner.</p>
          <p>If you have any questions or need further assistance, please contact us at fibersync.textile@gmail.com</p>
        </div>
      </div>
    `
  };
  