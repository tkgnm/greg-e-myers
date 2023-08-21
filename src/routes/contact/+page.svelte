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

<main>
	<h2>Contact</h2>
	<p>Please enquire for sales, commissions, and gallery shows.</p>

	<div class="email-container">
		<p class="email">{emailAddress}</p>
		<button class="copy-button" on:click={copyToClipboard}>Copy Email</button>
	</div>

	<p class="copied-message">{copiedMessage}</p>

	Instagram:<a href="https://www.instagram.com/gregemyers" target="_blank">@gregemyers</a>
</main>

<style>
	.email-container {
		display: flex;
		align-items: center;
	}

	.email {
		margin-right: 10px;
	}

	.copy-button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 5px 10px;
		cursor: pointer;
	}

	.copied-message {
		color: green;
		font-size: 14px;
		margin-top: 5px;
		transition: opacity 0.5s;
	}
</style>
