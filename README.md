# Cybersecurity: Foundations, Architecture & Best Practices

A comprehensive guide and reference repository covering core cybersecurity concepts, threats, defense mechanisms, and industry standards.

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [The Core Principle: The CIA Triad](#the-core-principle-the-cia-triad)
- [Key Domains of Cybersecurity](#key-domains-of-cybersecurity)
  - [1. Network Security](#1-network-security)
  - [2. Application Security (AppSec)](#2-application-security-appsec)
  - [3. Cloud & Infrastructure Security](#3-cloud--infrastructure-security)
  - [4. Endpoint & Device Security](#4-endpoint--device-security)
  - [5. Identity & Access Management (IAM)](#5-identity--access-management-iam)
  - [6. Incident Response & Digital Forensics](#6-incident-response--digital-forensics)
  - [7. Governance, Risk & Compliance (GRC)](#7-governance-risk--compliance-grc)
- [Common Threats & Attack Vectors](#common-threats--attack-vectors)
- [Security Best Practices Checklist](#security-best-practices-checklist)
- [Essential Security Tools & Frameworks](#essential-security-tools--frameworks)
- [Certifications & Career Paths](#certifications--career-paths)
- [Contributing](#contributing)
- [License](#license)

---

## 🛡️ Introduction

Cybersecurity is the practice of protecting systems, networks, programs, devices, and data from digital attacks, unauthorized access, corruption, or theft. Modern cybersecurity relies on defense-in-depth: combining people, processes, and technology to establish layered resilience.

---

## 🔺 The Core Principle: The CIA Triad

Every information security program is rooted in the **CIA Triad**:

```
          Confidentiality
              /     \
             /   ▲   \
            /  Cyber  \
           /  Security \
          /             \
Integrity —————————————— Availability
```

- **Confidentiality**: Ensuring sensitive data is accessed only by authorized individuals (e.g., encryption at rest/transit, role-based access control).
- **Integrity**: Safeguarding the accuracy and completeness of data and systems against unauthorized tampering or modification (e.g., hashing, digital signatures, audit logs).
- **Availability**: Ensuring systems and resources are reliably accessible to authorized users whenever needed (e.g., redundancy, DDoS protection, disaster recovery, backups).

---

## 🌐 Key Domains of Cybersecurity

### 1. Network Security
Securing the integrity, confidentiality, and accessibility of computer networks and data transmitted across them.
- **Firewalls & IDS/IPS**: Inspecting and filtering ingress/egress network traffic.
- **Zero Trust Architecture (ZTA)**: *"Never trust, always verify."* Strict verification for every person and device trying to access network resources.
- **Segmentation & VPNs**: Isolating subnets, microsegmentation, and encrypting remote tunnels.

### 2. Application Security (AppSec)
Protecting software applications from threats throughout the software development life cycle (SDLC).
- **OWASP Top 10**: Mitigating critical risks such as SQL Injection, Broken Access Control, Cross-Site Scripting (XSS), and Insecure Deserialization.
- **DevSecOps**: Shifting security left by integrating SAST (Static Analysis), DAST (Dynamic Analysis), and dependency vulnerability scans into CI/CD pipelines.

### 3. Cloud & Infrastructure Security
Securing workloads, data, and configurations in private, public, and hybrid cloud environments (AWS, Azure, GCP).
- **Shared Responsibility Model**: Delineating provider responsibilities (security *of* the cloud) vs. customer responsibilities (security *in* the cloud).
- **Cloud Security Posture Management (CSPM)**: Identifying misconfigurations, compliance drift, and overly permissive IAM policies.

### 4. Endpoint & Device Security
Protecting end-user devices (workstations, mobile devices, servers, IoT).
- **EDR / XDR**: Endpoint Detection and Response tools monitoring behavior and detecting anomalous activities.
- **Patch Management**: Timely discovery and deployment of operating system and firmware updates.

### 5. Identity & Access Management (IAM)
Controlling who has access to which resources, and under what conditions.
- **Principle of Least Privilege (PoLP)**: Granting only the bare minimum permissions required for a user or service to perform its role.
- **Multi-Factor Authentication (MFA)**: Requiring two or more verification factors (something you know, have, or are).
- **Single Sign-On (SSO) & PAM**: Streamlining access while maintaining privileged access workstations and vaulted credentials for administrators.

### 6. Incident Response & Digital Forensics
Detecting, containing, eradicating, and recovering from security incidents.
- **NIST Incident Response Life Cycle**:
  1. Preparation
  2. Detection & Analysis
  3. Containment, Eradication & Recovery
  4. Post-Incident Activity (Lessons Learned)
- **SIEM & SOAR**: Centralized log aggregation, correlation, alerting, and automated playbooks (e.g., Splunk, Elastic SIEM, Wazuh).

### 7. Governance, Risk & Compliance (GRC)
Aligning security strategies with regulatory obligations and business risk tolerance.
- **Frameworks**: NIST Cybersecurity Framework (CSF), ISO/IEC 27001, CIS Controls, MITRE ATT&CK.
- **Regulations**: GDPR, HIPAA, PCI-DSS, SOC 2.

---

## ⚠️ Common Threats & Attack Vectors

| Threat | Description | Common Mitigation |
| :--- | :--- | :--- |
| **Phishing / Social Engineering** | Deceptive communications aimed at stealing credentials or deploying malware | Security awareness training, DMARC/DKIM/SPF, MFA |
| **Ransomware / Malware** | Malicious software that encrypts data or compromises systems for extortion | Immutable backups, EDR, endpoint segmentation, least privilege |
| **Man-in-the-Middle (MitM)** | Intercepting communications between two parties | TLS/HTTPS encryption, certificate pinning, secure DNS |
| **DDoS (Distributed Denial of Service)** | Flooding targets with excessive traffic to deplete capacity | CDN caching, rate limiting, DDoS scrubbing services (e.g., Cloudflare) |
| **Supply Chain Attacks** | Compromising third-party libraries, build systems, or vendor software | Software Bill of Materials (SBOM), dependency scanning, vendor audits |
| **Zero-Day Vulnerabilities** | Exploits targeting unknown vulnerabilities before a patch exists | Defense-in-depth, behavioral monitoring, network isolation |

---

## 🔒 Security Best Practices Checklist

- [ ] **Enforce Strong Authentication**: Require multi-factor authentication (MFA) across all email, code repositories, and administrative interfaces.
- [ ] **Practice Least Privilege**: Review user accounts and API keys regularly; revoke unused permissions.
- [ ] **Keep Software Updated**: Automate OS and third-party dependency updates to patch known CVEs.
- [ ] **Encrypt Data Everywhere**: Use AES-256 for data at rest and TLS 1.3 for data in transit.
- [ ] **Back Up Reliably**: Follow the 3-2-1 backup rule (3 copies, 2 different media, 1 offsite/immutable).
- [ ] **Monitor & Log**: Retain immutable audit logs and configure real-time alerts for privilege escalations or failed logins.
- [ ] **Conduct Drills**: Perform regular tabletop incident response exercises and penetration tests.

---

## 🧰 Essential Security Tools & Frameworks

- **Vulnerability Scanning & Reconnaissance**: `nmap`, `Wireshark`, `OpenVAS`, `Shodan`
- **Application Security & Web Testing**: `OWASP ZAP`, `Burp Suite`, `Semgrep`, `Snyk`
- **Penetration Testing & Red Teaming**: `Kali Linux`, `Metasploit`, `BloodHound`
- **Blue Team, SIEM & Defense**: `Wazuh`, `Suricata`, `Snort`, `Zeek`, `Elastic Security`
- **Knowledge Bases**: [MITRE ATT&CK®](https://attack.mitre.org/), [OWASP](https://owasp.org/), [CVE Details](https://cve.mitre.org/)

---

## 🎓 Certifications & Career Paths

- **Entry Level**: CompTIA Security+, CompTIA Network+, SSCP
- **Intermediate**: Certified Ethical Hacker (CEH), CompTIA CySA+, GIAC GSEC
- **Advanced / Specialized**:
  - Offensive: OSCP (OffSec Certified Professional)
  - Cloud: AWS Certified Security - Specialty, Azure Security Engineer (AZ-500)
  - Management & Architecture: CISSP, CISM, CISA

---

## 🤝 Contributing

Contributions are welcome! If you would like to add guides, tools, or best practice references:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/topic`).
3. Commit your changes (`git commit -m 'Add new section on topic'`).
4. Push to the branch (`git push origin feature/topic`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
