<script>
	let emailAddress = 'contact@gregemyers.com';
	let copiedMessage = '';

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(emailAddress);
			copiedMessage = 'Copied to clipboard';
			setTimeout(() => {
				copiedMessage = '';
			}, 2000); // Hide message after 2 seconds
		} catch (error) {
			console.error('Unable to copy email address to clipboard:', error);
		}
	}
</script>

<title>Greg E Myers - Contact</title>
<meta
	name="description"
	content="Contact information for visual artist Greg E Myers. Available for sales, commissions and gallery shows."
/>
<h2>Contact</h2>
<p>Please enquire for sales, commissions, and gallery shows.</p>

<div class = "email-container">
Instagram:<a href="https://www.instagram.com/gregemyers" target="_blank">@gregemyers</a>
</div>
<div class="email-container">
	<div class="email-button-container">
		<p class="email">{emailAddress}</p>
		{#if !copiedMessage}
			<button class="copy-button" on:click={copyToClipboard}>Copy Email</button>
		{/if}
		{#if copiedMessage === 'Copied to clipboard'}
			<p class="copied-message">Email Copied</p>
		{/if}
	</div>
	{#if copiedMessage === 'Copied to clipboard'}
		<div class="background-fade" on:transitionend={() => (copiedMessage = '')} />
	{/if}
</div>

<style>
	.email-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.email-button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.email {
		margin-right: 10px;
		margin-bottom: 0; /* Reset bottom margin to ensure consistent alignment */
	}

	.copy-button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 5px 10px;
		cursor: pointer;
		margin-top: 10px;
	}

	.copied-message {
		color: green;
		font-size: 14px;
		margin-top: 15px;

		margin-bottom: 0; /* Reset bottom margin to ensure consistent alignment */
		transition: opacity 0.5s;
	}
</style>
