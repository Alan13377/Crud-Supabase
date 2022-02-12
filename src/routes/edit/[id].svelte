<script>
	import { page } from '$app/stores';
	import supabase from '$lib/db';
	import { onMount } from 'svelte';
	import Form from '../../components/Form.svelte';
	import Notifications from 'svelte-notifications';
	let id = $page.params.id;

	let titulo = '';
	let texto = '';
	let filename = '';

	onMount(async () => {
		let { data } = await supabase.from(`post`).select('*').eq('id', id);
		titulo = data[0].titulo;
		texto = data[0].texto;
	});
</script>

<h1 class="text-7xl">Editar Post</h1>

<Notifications>
	<Form {titulo} {texto} {id} {filename} />
</Notifications>
