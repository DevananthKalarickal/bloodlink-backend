const image = 'https://www.teamhealth.com/wp-content/uploads/2022/06/TH-13654-World-Blood-Donor-Day-Social-Graphics_ForApproval_Blog.jpg';

exports.registerEmail = (name) => {
    return `
        <table style="font-family: 'Roboto', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a2980, #26d0ce); color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.2);">
            <tbody>
                <!-- Header Section -->
                <tr>
                    <td style="background: rgba(0,0,0,0.2); padding: 30px; text-align: center;">
                        <h1 style="font-size: 32px; margin: 15px 0; text-transform: uppercase; letter-spacing: 2px;">BloodLink</h1>
                        <p style="font-size: 18px; opacity: 0.8; font-weight: 300;">Connecting Lives, Transforming Hope</p>
                    </td>
                </tr>
                <!-- Image Section with Overlay -->
                <tr>
                    <td style="padding: 0; position: relative; text-align: center;">
                        <img src="${image}" alt="World Blood Donor Day" style="width: 100%; border-radius: 12px 12px 0 0; opacity: 0.7;">
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);">
                            <h2 style="font-size: 28px; margin: 0;">Welcome, ${name}!</h2>
                            <p style="font-size: 16px; margin-top: 10px;">Your journey with BloodLink starts now.</p>
                        </div>
                    </td>
                </tr>
                <!-- Welcome Text Section -->
                <tr>
                    <td style="padding: 30px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
                        <p style="font-size: 22px; margin-bottom: 20px;">Hello ${name},</p>
                        <p style="line-height: 1.6; margin-bottom: 20px;">Thank you for registering with BloodLink. Together, we are building a community of hope and life-saving connections.</p>
                      
                    </td>
                </tr>
                <!-- Footer Section -->
                <tr>
                    <td style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; font-size: 12px;">
                        <p>© 2024 BloodLink | Powered by Innovation</p>
                        <div style="margin-top: 10px;">
                            <a href="#" style="color: #26d0ce; margin: 0 10px; text-decoration: none;">Privacy</a>
                            <a href="#" style="color: #26d0ce; margin: 0 10px; text-decoration: none;">Terms</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
};
