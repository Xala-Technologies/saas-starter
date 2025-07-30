# GitHub Packages Setup Guide

This guide explains how to set up authentication for GitHub Packages to access the `@xala-technologies/ui-system` package.

## 🔑 Creating a GitHub Personal Access Token

1. **Navigate to GitHub Settings**
   - Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
   - Or click your profile picture → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token (classic)"
   - Add a descriptive note like "SaaS Starter - UI System Access"
   - Set expiration (recommended: 90 days for security)

3. **Select Required Scopes**
   - ✅ `read:packages` - Required to download packages from GitHub Packages
   - ✅ `repo` - May be required if the package repository is private
   - ❌ Do NOT select unnecessary scopes for security

4. **Generate and Copy Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately - you won't be able to see it again
   - Token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔧 Local Development Setup

### Option 1: Environment Variable (Recommended)

1. **Create/Update .env.local**
   ```bash
   # Add to your .env.local file (create if it doesn't exist)
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

2. **Verify Configuration**
   ```bash
   # Test that the token is working
   pnpm install
   ```

### Option 2: Direct .npmrc Configuration (Alternative)

1. **Update .npmrc manually**
   ```bash
   # Replace ${GITHUB_TOKEN} with your actual token in .npmrc
   //npm.pkg.github.com/:_authToken=ghp_your_actual_token_here
   ```

   ⚠️ **Warning**: This approach stores the token in plain text. Use environment variables instead.

## 🚀 Team Setup Instructions

### For New Team Members

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-starter
   ```

2. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

3. **Generate GitHub token** (follow steps above)

4. **Add token to .env.local**
   ```bash
   # Edit .env.local and add:
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

5. **Install dependencies**
   ```bash
   pnpm install
   ```

### For CI/CD Environments

1. **Add GitHub Token as Secret**
   - GitHub Actions: Add `GITHUB_TOKEN` to repository secrets
   - Vercel: Add `GITHUB_TOKEN` to environment variables
   - Other platforms: Follow their documentation for adding secrets

2. **Verify in Build Process**
   - The token should be available as `process.env.GITHUB_TOKEN`
   - The .npmrc file will automatically use the environment variable

## 🔍 Troubleshooting

### Common Issues

1. **"Unable to authenticate" error**
   - Verify token has `read:packages` scope
   - Check token hasn't expired
   - Ensure token is correctly set in environment

2. **"Package not found" error**
   - Verify you have access to the Xala Technologies organization
   - Check if the package version exists
   - Ensure .npmrc is configured correctly

3. **"Failed to replace env in config" warning**
   - This warning appears when GITHUB_TOKEN is not set
   - Add the token to your .env.local file
   - The warning won't prevent installation if token is available elsewhere

### Verification Commands

```bash
# Check if token is loaded
echo $GITHUB_TOKEN

# Test package installation
pnpm install @xala-technologies/ui-system@4.7.1

# Verify imports work
node -e "console.log(Object.keys(require('@xala-technologies/ui-system')).slice(0, 5))"
```

## 🔒 Security Best Practices

1. **Never commit tokens to git**
   - Always use .env.local (which is gitignored)
   - Never put tokens directly in .npmrc if it's committed

2. **Use minimal scopes**
   - Only grant `read:packages` scope
   - Avoid `repo` scope unless absolutely necessary

3. **Regular token rotation**
   - Set reasonable expiration dates (30-90 days)
   - Update tokens before they expire

4. **Team token management**
   - Each team member should use their own token
   - Don't share tokens between team members

## 📚 Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Personal Access Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [npm Configuration Documentation](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting guide first
2. Verify your token permissions and expiration
3. Contact the development team
4. Create an issue in the repository with error details
