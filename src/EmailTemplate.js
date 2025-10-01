import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Paper 
} from '@material-ui/core';
import { MetaTags } from "react-meta-tags";
export default function ConstituentTemplate() {
  const [recipientTitle, setRecipientTitle] = useState("Representative");
  const [customRecipientTitle, setCustomRecipientTitle] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [yourName, setYourName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [includeShort, setIncludeShort] = useState(false);

  // Use custom title if "Other" is selected, otherwise use the selected title
  const actualRecipientTitle = useMemo(
    () => (recipientTitle === "Other" ? customRecipientTitle : recipientTitle),
    [recipientTitle, customRecipientTitle]
  );

  const template = useMemo(() => {
  const body = `Dear ${actualRecipientTitle} ${recipientLastName || "[Last Name]"},\n\n` +
    `My name is ${yourName || "[Your Name]"}, and I am writing to you because I am deeply concerned about the wave of legislation targeting transgender people in our country.\n\n` +
    `As a constituent of ${state || "[Your State]"}, I expect my elected officials to protect *all* their constituents. I want to urge you to oppose any anti-trans laws that are targeting trans people, as we are free, tax-paying U.S. citizens.\n\n` +
    `Leadership means protecting the vulnerable. Even Jesus taught us to care for the poor and marginalized, yet policies being advanced seek to take away social programs and strip people of their rights. This is not what true public service looks like.\n\n` +
    `I am asking you to stand on the side of justice and equality. Please protect the rights of your transgender constituents and reject harmful legislation.\n\n` +
    `Sincerely,\n${yourName || "[Your Full Name]"}\n${city || "[Your City]"}, ${state || "[Your State]"}`;

  return (body);
}, [actualRecipientTitle, customRecipientTitle, recipientTitle, recipientLastName, yourName, city, state, includeShort]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(template);
      alert("Template copied to clipboard.");
    } catch (err) {
      console.error(err);
      alert("Failed to copy. You can select the text and copy manually.");
    }
  };

  const downloadAsPdf = () => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - margin * 2;
    doc.setFont("Times", "");
    doc.setFontSize(12);
    doc.text(template, margin, margin, { maxWidth: textWidth, align: "left" });
    doc.save("constituent-template.pdf");
  };

  return (
    <div>
     <MetaTags>
    <title>Anti Trans Legislation Outreach Template</title>
    <meta id="meta-description" name="description" content="Anti Trans Legislation Outreach Template" />
    <meta id="og-title" property="og:title" content="Anti Trans Legislation Outreach Template" />
    <meta id="og-image" property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Transgender_Pride_flag.svg/1200px-Transgender_Pride_flag.svg.png" />
    </MetaTags>
    <Paper style={{ maxWidth: '800px', margin: '2% auto', padding: '24px' }}>
     <Typography variant="h4" component="h1" gutterBottom>
        Anti-Trans Law Outreach Template 🏳️‍⚧️
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom style={{ marginBottom: '24px', color: '#666' }}>
        Contact Your Lawmakers to Oppose Anti-Trans Legislation
        </Typography>

      <Grid container spacing={3} style={{ marginBottom: '16px' }}>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Recipient Type</InputLabel>
          <Select
            value={recipientTitle}
            onChange={(e) => setRecipientTitle(e.target.value)}
          >
            <MenuItem value="Representative">Representative</MenuItem>
            <MenuItem value="Senator">Senator</MenuItem>
            <MenuItem value="Governor">Governor</MenuItem>
            <MenuItem value="Mayor">Mayor</MenuItem>
            <MenuItem value="Council Member">Council Member</MenuItem>
            <MenuItem value="Commissioner">Commissioner</MenuItem>
            <MenuItem value="Other">Other (type below)</MenuItem>
          </Select>
        </FormControl>
        {recipientTitle === "Other" && (
          <TextField
            fullWidth
            label="Custom Recipient Type"
            value={customRecipientTitle}
            onChange={(e) => setCustomRecipientTitle(e.target.value)}
            placeholder="Enter custom recipient type"
            style={{ marginTop: '8px' }}
          />
        )}
      </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Recipient Last Name"
            value={recipientLastName}
            onChange={(e) => setRecipientLastName(e.target.value)}
            placeholder="[Last Name]"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Your Full Name"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            placeholder="[Your Name]"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="[Your City]"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="[Your State]"
          />
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={copyToClipboard}
          >
            Copy Text
          </Button>

          <Button
            variant="outlined"
            onClick={downloadAsPdf}
          >
            Download PDF
          </Button>
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Generated message"
        value={template}
        multiline
        rows={14}
        InputProps={{
          readOnly: true,
        }}
        style={{ fontFamily: 'monospace', fontSize: '14px' }}
      />

      <Box marginTop={3}>
        <Button
          fullWidth
          variant="contained"
          style={{ backgroundColor: '#333', color: 'white', marginBottom: '8px' }}
          href="https://www.senate.gov/senators/senators-contact.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find your U.S. Senator
        </Button>
        <Button
          fullWidth
          variant="contained"
          style={{ backgroundColor: '#333', color: 'white' }}
          href="https://www.house.gov/representatives/find-your-representative"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find your U.S. Representative
        </Button>
      </Box>

      <Typography variant="caption" color="textSecondary" style={{ marginTop: '12px', display: 'block' }}>
        Tip: Fill in the recipient and location fields to replace placeholders, then copy & paste the result into your representative's contact form or email client.
      </Typography>
    </Paper>
    </div>
  );
}