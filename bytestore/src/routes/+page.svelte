<svelte:head>
    <title>SIMTOO - Shop Inventory Management</title>
</svelte:head>

<script>
    // @ts-ignore
    import { onMount } from 'svelte';
    // @ts-ignore
    let footprint;
    const apiURL = 'http://localhost:8694';

    let username = "";
    let password = "";
    let mode = "User";
		
		

    // This will make a request to the API
    // When Svelte loads. That's really cool,
    // But at the moment, I don't need that.
    onMount(async () =>{
        // Api Call
    });

    const login = async () =>{

        fetch(apiURL + '/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Allow-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                mode: mode
            })
        })
        .then(res => res)
        .then(data => console.log(data))
        .catch(err => console.log("Error! " + err));

    };
</script>

<div class="main">
    <div class="interior">
        <h1 class="large title">SIM</h1>

        <div id="user" class="active">
            <div class="loginForm">
                <input type="text" name="user" placeholder="Account Name" bind:value={username}>

                <input type="password" name="pass" placeholder="Password" bind:value={password}>

                <select name="mode" placeholder="User" bind:value={mode}>
                    <option value="user" selected="selected">User</option>
                    <option value="management">Backend</option>
                    <option value="till">Till</option>
                </select>

                <button class="login" on:click={() => login()}>Log in</button>
            </div>
        </div>
    </div>
</div>